import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    id: bigint;
    status: Status;
    serviceType: string;
    date: string;
    name: string;
    time: string;
    dropLocation: string;
    timestamp: Time;
    phone: string;
    pickupLocation: string;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export interface New {
    serviceType: string;
    date: string;
    name: string;
    time: string;
    dropLocation: string;
    phone: string;
    pickupLocation: string;
}
export enum Status {
    pending = "pending",
    completed = "completed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    adminLogin(email: string, password: string): Promise<string | null>;
    validateAdminSession(token: string): Promise<boolean>;
    adminLogout(token: string): Promise<void>;
    getAllBookingsWithToken(token: string): Promise<Array<Booking>>;
    deleteBookingWithToken(token: string, bookingId: bigint): Promise<void>;
    markBookingCompletedWithToken(token: string, bookingId: bigint): Promise<void>;
    deleteBooking(bookingId: bigint): Promise<void>;
    getAllBookings(): Promise<Array<Booking>>;
    getBooking(bookingId: bigint): Promise<Booking>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markBookingCompleted(bookingId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitBooking(newBooking: New): Promise<bigint>;
}
