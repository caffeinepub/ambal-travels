import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { New } from "../backend.d";
import { useActor } from "./useActor";

const SESSION_KEY = "ambal_admin_session";

export function getAdminSession(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

export function setAdminSession(token: string) {
  localStorage.setItem(SESSION_KEY, token);
}

export function clearAdminSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function useGetAllBookings() {
  const { actor, isFetching } = useActor();
  const token = getAdminSession();
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor || !token) return [];
      return actor.getAllBookingsWithToken(token);
    },
    enabled: !!actor && !isFetching && !!token,
  });
}

export function useSubmitBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (booking: New) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitBooking(booking);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useDeleteBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      const token = getAdminSession();
      if (!token) throw new Error("Not authenticated");
      return actor.deleteBookingWithToken(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useMarkBookingCompleted() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      const token = getAdminSession();
      if (!token) throw new Error("Not authenticated");
      return actor.markBookingCompletedWithToken(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useAdminLogin() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: { email: string; password: string }) => {
      if (!actor) throw new Error("Not connected");
      const token = await actor.adminLogin(email, password);
      if (!token) throw new Error("Invalid email or password");
      setAdminSession(token);
      return token;
    },
  });
}

export function useValidateAdminSession() {
  const { actor, isFetching } = useActor();
  const token = getAdminSession();
  return useQuery({
    queryKey: ["adminSession", token],
    queryFn: async () => {
      if (!actor || !token) return false;
      return actor.validateAdminSession(token);
    },
    enabled: !!actor && !isFetching && !!token,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
