import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  module Booking {
    public type Status = {
      #pending;
      #completed;
    };

    public type New = {
      name : Text;
      phone : Text;
      pickupLocation : Text;
      dropLocation : Text;
      date : Text;
      time : Text;
      serviceType : Text;
    };

    public type Booking = {
      id : Nat;
      name : Text;
      phone : Text;
      pickupLocation : Text;
      dropLocation : Text;
      date : Text;
      time : Text;
      serviceType : Text;
      timestamp : Time.Time;
      status : Status;
    };

    public func compareByTimestampAsc(booking1 : Booking, booking2 : Booking) : Order.Order {
      Nat.compare(booking1.id, booking2.id);
    };
  };

  public type UserProfile = {
    name : Text;
  };

  var nextBookingId = 0;

  let bookings = Map.empty<Nat, Booking.Booking>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Admin credentials
  var adminEmail : Text = "harishposhi@gmail.com";
  var adminPassword : Text = "Ambal@2024";

  // Session storage: token -> expiry time (nanoseconds)
  let adminSessions = Map.empty<Text, Int>();

  func generateToken() : Text {
    Time.now().toText()
  };

  func isValidSession(token : Text) : Bool {
    switch (adminSessions.get(token)) {
      case null { false };
      case (?expiry) { Time.now() < expiry };
    };
  };

  // Admin email/password login — returns session token or null
  public shared func adminLogin(email : Text, password : Text) : async ?Text {
    if (email == adminEmail and password == adminPassword) {
      let token = generateToken();
      // 24 hours in nanoseconds
      adminSessions.add(token, Time.now() + 86_400_000_000_000);
      ?token
    } else {
      null
    };
  };

  public query func validateAdminSession(token : Text) : async Bool {
    isValidSession(token)
  };

  public shared func adminLogout(token : Text) : async () {
    adminSessions.remove(token);
  };

  // Booking functions using session token (for frontend)
  public query func getAllBookingsWithToken(token : Text) : async [Booking.Booking] {
    if (not isValidSession(token)) {
      Runtime.trap("Unauthorized: Invalid or expired session");
    };
    bookings.values().toArray().sort(Booking.compareByTimestampAsc);
  };

  public shared func deleteBookingWithToken(token : Text, bookingId : Nat) : async () {
    if (not isValidSession(token)) {
      Runtime.trap("Unauthorized: Invalid or expired session");
    };
    bookings.remove(bookingId);
  };

  public shared func markBookingCompletedWithToken(token : Text, bookingId : Nat) : async () {
    if (not isValidSession(token)) {
      Runtime.trap("Unauthorized: Invalid or expired session");
    };
    let booking = getBookingInternal(bookingId);
    let updatedBooking = { booking with status = #completed };
    bookings.add(bookingId, updatedBooking);
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Booking Functions
  public shared func submitBooking(newBooking : Booking.New) : async Nat {
    let id = nextBookingId;
    nextBookingId += 1;
    let booking : Booking.Booking = {
      id;
      name = newBooking.name;
      phone = newBooking.phone;
      pickupLocation = newBooking.pickupLocation;
      dropLocation = newBooking.dropLocation;
      date = newBooking.date;
      time = newBooking.time;
      serviceType = newBooking.serviceType;
      timestamp = Time.now();
      status = #pending;
    };
    bookings.add(id, booking);
    id;
  };

  public query ({ caller }) func getBooking(bookingId : Nat) : async Booking.Booking {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can view bookings");
    };
    switch (bookings.get(bookingId)) {
      case (null) { Runtime.trap("Booking does not exist") };
      case (?booking) { booking };
    };
  };

  private func getBookingInternal(bookingId : Nat) : Booking.Booking {
    switch (bookings.get(bookingId)) {
      case (null) { Runtime.trap("Booking does not exist") };
      case (?booking) { booking };
    };
  };

  // Legacy admin functions (kept for backward compatibility)
  public query ({ caller }) func getAllBookings() : async [Booking.Booking] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can view all bookings");
    };
    bookings.values().toArray().sort(Booking.compareByTimestampAsc);
  };

  public shared ({ caller }) func deleteBooking(bookingId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can delete bookings");
    };
    bookings.remove(bookingId);
  };

  public shared ({ caller }) func markBookingCompleted(bookingId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can mark bookings as completed");
    };
    let booking = getBookingInternal(bookingId);
    let updatedBooking = { booking with status = #completed };
    bookings.add(bookingId, updatedBooking);
  };
};
