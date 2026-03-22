import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Car, Loader2, Lock, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useActor } from "../hooks/useActor";
import { useAdminLogin, useValidateAdminSession } from "../hooks/useQueries";

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useAdminLogin();
  const { data: isValid, isLoading: validating } = useValidateAdminSession();
  const { actor, isFetching: actorLoading } = useActor();

  useEffect(() => {
    if (isValid === true) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [isValid, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    try {
      await loginMutation.mutateAsync({ email, password });
      navigate({ to: "/admin/dashboard" });
    } catch {
      // error shown via loginMutation.error
    }
  };

  const isConnecting = actorLoading || !actor;
  const isButtonDisabled = loginMutation.isPending || isConnecting;

  if (validating) {
    return (
      <main className="min-h-screen bg-brand-light flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-yellow" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-light flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-brand-dark p-8 text-center">
            <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Car className="w-9 h-9 text-brand-dark" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">
              Ambal Travels — Secure Access
            </p>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-bold text-brand-dark mb-1">Sign In</h2>
            <p className="text-gray-500 text-sm mb-6">
              Enter your admin credentials to access the dashboard.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-brand-dark font-semibold"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 h-11"
                    required
                    data-ocid="admin.email_input"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-brand-dark font-semibold"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 h-11"
                    required
                    data-ocid="admin.password_input"
                  />
                </div>
              </div>

              {loginMutation.error && (
                <div
                  className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-red-600 text-sm"
                  data-ocid="admin.error_state"
                >
                  {loginMutation.error.message === "Not connected"
                    ? "Connecting to server... Please try again in a moment."
                    : loginMutation.error.message ||
                      "Invalid email or password"}
                </div>
              )}

              <Button
                type="submit"
                disabled={isButtonDisabled}
                className="w-full bg-brand-yellow text-brand-dark font-bold hover:opacity-90 transition-opacity h-12 text-base mt-2 disabled:opacity-60"
                data-ocid="admin.primary_button"
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Signing
                    in...
                  </>
                ) : isConnecting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
