/* eslint-disable */

// @ts-nocheck

import { IDL } from '@icp-sdk/core/candid';

export const UserRole = IDL.Variant({
  'admin' : IDL.Null,
  'user' : IDL.Null,
  'guest' : IDL.Null,
});
export const Status = IDL.Variant({
  'pending' : IDL.Null,
  'completed' : IDL.Null,
});
export const Time = IDL.Int;
export const Booking = IDL.Record({
  'id' : IDL.Nat,
  'status' : Status,
  'serviceType' : IDL.Text,
  'date' : IDL.Text,
  'name' : IDL.Text,
  'time' : IDL.Text,
  'dropLocation' : IDL.Text,
  'timestamp' : Time,
  'phone' : IDL.Text,
  'pickupLocation' : IDL.Text,
});
export const UserProfile = IDL.Record({ 'name' : IDL.Text });
export const New = IDL.Record({
  'serviceType' : IDL.Text,
  'date' : IDL.Text,
  'name' : IDL.Text,
  'time' : IDL.Text,
  'dropLocation' : IDL.Text,
  'phone' : IDL.Text,
  'pickupLocation' : IDL.Text,
});

export const idlService = IDL.Service({
  '_initializeAccessControlWithSecret' : IDL.Func([IDL.Text], [], []),
  'assignCallerUserRole' : IDL.Func([IDL.Principal, UserRole], [], []),
  'adminLogin' : IDL.Func([IDL.Text, IDL.Text], [IDL.Opt(IDL.Text)], []),
  'validateAdminSession' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
  'adminLogout' : IDL.Func([IDL.Text], [], []),
  'getAllBookingsWithToken' : IDL.Func([IDL.Text], [IDL.Vec(Booking)], ['query']),
  'deleteBookingWithToken' : IDL.Func([IDL.Text, IDL.Nat], [], []),
  'markBookingCompletedWithToken' : IDL.Func([IDL.Text, IDL.Nat], [], []),
  'deleteBooking' : IDL.Func([IDL.Nat], [], []),
  'getAllBookings' : IDL.Func([], [IDL.Vec(Booking)], ['query']),
  'getBooking' : IDL.Func([IDL.Nat], [Booking], ['query']),
  'getCallerUserProfile' : IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
  'getCallerUserRole' : IDL.Func([], [UserRole], ['query']),
  'getUserProfile' : IDL.Func([IDL.Principal], [IDL.Opt(UserProfile)], ['query']),
  'isCallerAdmin' : IDL.Func([], [IDL.Bool], ['query']),
  'markBookingCompleted' : IDL.Func([IDL.Nat], [], []),
  'saveCallerUserProfile' : IDL.Func([UserProfile], [], []),
  'submitBooking' : IDL.Func([New], [IDL.Nat], []),
});

export const idlInitArgs = [];

export const idlFactory = ({ IDL }) => {
  const UserRole = IDL.Variant({ 'admin' : IDL.Null, 'user' : IDL.Null, 'guest' : IDL.Null });
  const Status = IDL.Variant({ 'pending' : IDL.Null, 'completed' : IDL.Null });
  const Time = IDL.Int;
  const Booking = IDL.Record({
    'id' : IDL.Nat, 'status' : Status, 'serviceType' : IDL.Text,
    'date' : IDL.Text, 'name' : IDL.Text, 'time' : IDL.Text,
    'dropLocation' : IDL.Text, 'timestamp' : Time, 'phone' : IDL.Text,
    'pickupLocation' : IDL.Text,
  });
  const UserProfile = IDL.Record({ 'name' : IDL.Text });
  const New = IDL.Record({
    'serviceType' : IDL.Text, 'date' : IDL.Text, 'name' : IDL.Text,
    'time' : IDL.Text, 'dropLocation' : IDL.Text, 'phone' : IDL.Text,
    'pickupLocation' : IDL.Text,
  });
  return IDL.Service({
    '_initializeAccessControlWithSecret' : IDL.Func([IDL.Text], [], []),
    'assignCallerUserRole' : IDL.Func([IDL.Principal, UserRole], [], []),
    'adminLogin' : IDL.Func([IDL.Text, IDL.Text], [IDL.Opt(IDL.Text)], []),
    'validateAdminSession' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'adminLogout' : IDL.Func([IDL.Text], [], []),
    'getAllBookingsWithToken' : IDL.Func([IDL.Text], [IDL.Vec(Booking)], ['query']),
    'deleteBookingWithToken' : IDL.Func([IDL.Text, IDL.Nat], [], []),
    'markBookingCompletedWithToken' : IDL.Func([IDL.Text, IDL.Nat], [], []),
    'deleteBooking' : IDL.Func([IDL.Nat], [], []),
    'getAllBookings' : IDL.Func([], [IDL.Vec(Booking)], ['query']),
    'getBooking' : IDL.Func([IDL.Nat], [Booking], ['query']),
    'getCallerUserProfile' : IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
    'getCallerUserRole' : IDL.Func([], [UserRole], ['query']),
    'getUserProfile' : IDL.Func([IDL.Principal], [IDL.Opt(UserProfile)], ['query']),
    'isCallerAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'markBookingCompleted' : IDL.Func([IDL.Nat], [], []),
    'saveCallerUserProfile' : IDL.Func([UserProfile], [], []),
    'submitBooking' : IDL.Func([New], [IDL.Nat], []),
  });
};

export const init = ({ IDL }) => { return []; };
