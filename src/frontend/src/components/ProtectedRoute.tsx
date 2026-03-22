import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import {
  clearAdminSession,
  getAdminSession,
  useValidateAdminSession,
} from "../hooks/useQueries";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const token = getAdminSession();
  const { data: isValid, isLoading } = useValidateAdminSession();

  useEffect(() => {
    if (!token) {
      navigate({ to: "/admin" });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!isLoading && isValid === false && token) {
      clearAdminSession();
      navigate({ to: "/admin" });
    }
  }, [isValid, isLoading, token, navigate]);

  if (isLoading || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="text-center" data-ocid="dashboard.loading_state">
          <Loader2 className="w-10 h-10 animate-spin text-brand-yellow mx-auto mb-3" />
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isValid) return null;

  return <>{children}</>;
}
