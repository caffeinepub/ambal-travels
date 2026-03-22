/* eslint-disable */

// @ts-nocheck

import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';
import type { Principal } from '@icp-sdk/core/principal';

export interface Booking {
  'id' : bigint,
  'status' : Status,
  'serviceType' : string,
  'date' : string,
  'name' : string,
  'time' : string,
  'dropLocation' : string,
  'timestamp' : Time,
  'phone' : string,
  'pickupLocation' : string,
}
export interface New {
  'serviceType' : string,
  'date' : string,
  'name' : string,
  'time' : string,
  'dropLocation' : string,
  'phone' : string,
  'pickupLocation' : string,
}
export type Status = { 'pending' : null } |
  { 'completed' : null };
export type Time = bigint;
export interface UserProfile { 'name' : string }
export type UserRole = { 'admin' : null } |
  { 'user' : null } |
  { 'guest' : null };
export interface _SERVICE {
  '_initializeAccessControlWithSecret' : ActorMethod<[string], undefined>,
  'assignCallerUserRole' : ActorMethod<[Principal, UserRole], undefined>,
  'adminLogin' : ActorMethod<[string, string], [] | [string]>,
  'validateAdminSession' : ActorMethod<[string], boolean>,
  'adminLogout' : ActorMethod<[string], undefined>,
  'getAllBookingsWithToken' : ActorMethod<[string], Array<Booking>>,
  'deleteBookingWithToken' : ActorMethod<[string, bigint], undefined>,
  'markBookingCompletedWithToken' : ActorMethod<[string, bigint], undefined>,
  'deleteBooking' : ActorMethod<[bigint], undefined>,
  'getAllBookings' : ActorMethod<[], Array<Booking>>,
  'getBooking' : ActorMethod<[bigint], Booking>,
  'getCallerUserProfile' : ActorMethod<[], [] | [UserProfile]>,
  'getCallerUserRole' : ActorMethod<[], UserRole>,
  'getUserProfile' : ActorMethod<[Principal], [] | [UserProfile]>,
  'isCallerAdmin' : ActorMethod<[], boolean>,
  'markBookingCompleted' : ActorMethod<[bigint], undefined>,
  'saveCallerUserProfile' : ActorMethod<[UserProfile], undefined>,
  'submitBooking' : ActorMethod<[New], bigint>,
}
export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
