import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import {
  Car,
  CheckCircle,
  Loader2,
  LogOut,
  MessageCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Booking } from "../backend.d";
import { Status } from "../backend.d";
import {
  clearAdminSession,
  useDeleteBooking,
  useGetAllBookings,
  useMarkBookingCompleted,
} from "../hooks/useQueries";

const WHATSAPP_MESSAGE = `Dear Customer,

Your car booking has been successfully confirmed. 🚗
Thank you for choosing us! We look forward to serving you and wish you a pleasant journey.

If you need any assistance, feel free to contact us anytime.`;

function buildWhatsAppUrl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const { data: bookings = [], isLoading, refetch } = useGetAllBookings();
  const deleteMutation = useDeleteBooking();
  const completeMutation = useMarkBookingCompleted();
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const filtered = bookings.filter((b) => {
    if (filter === "all") return true;
    if (filter === "pending") return b.status === Status.pending;
    return b.status === Status.completed;
  });

  const totalBookings = bookings.length;
  const pendingCount = bookings.filter(
    (b) => b.status === Status.pending,
  ).length;
  const completedCount = bookings.filter(
    (b) => b.status === Status.completed,
  ).length;

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Booking deleted");
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  const handleComplete = async (id: bigint) => {
    try {
      await completeMutation.mutateAsync(id);
      toast.success("Booking marked as completed");
    } catch {
      toast.error("Failed to update booking");
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Admin Header */}
      <header className="bg-brand-dark text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-brand-dark" />
            </div>
            <span className="font-bold text-lg">
              Ambal Travels — <span className="text-brand-yellow">Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              className="text-gray-400 hover:text-white"
              data-ocid="dashboard.secondary_button"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-400 hover:text-white flex items-center gap-2"
              data-ocid="dashboard.primary_button"
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            {
              label: "Total Bookings",
              value: totalBookings,
              color: "bg-brand-yellow",
              textColor: "text-brand-dark",
            },
            {
              label: "Pending",
              value: pendingCount,
              color: "bg-orange-500",
              textColor: "text-white",
            },
            {
              label: "Completed",
              value: completedCount,
              color: "bg-green-500",
              textColor: "text-white",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${stat.color} rounded-2xl p-6 shadow-card`}
              data-ocid={`stats.card.${i + 1}`}
            >
              <p className={`text-4xl font-extrabold ${stat.textColor}`}>
                {stat.value}
              </p>
              <p
                className={`text-sm font-semibold mt-1 ${stat.textColor} opacity-80`}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-xl font-bold text-brand-dark">Bookings</h2>
            <Tabs
              value={filter}
              onValueChange={(v) =>
                setFilter(v as "all" | "pending" | "completed")
              }
            >
              <TabsList className="bg-brand-light">
                <TabsTrigger value="all" data-ocid="dashboard.tab">
                  All
                </TabsTrigger>
                <TabsTrigger value="pending" data-ocid="dashboard.tab">
                  Pending
                </TabsTrigger>
                <TabsTrigger value="completed" data-ocid="dashboard.tab">
                  Completed
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {isLoading ? (
            <div
              className="flex items-center justify-center py-16"
              data-ocid="bookings.loading_state"
            >
              <Loader2 className="w-8 h-8 animate-spin text-brand-yellow" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16" data-ocid="bookings.empty_state">
              <p className="text-gray-400 font-medium">No bookings found</p>
              <p className="text-gray-300 text-sm mt-1">
                Bookings will appear here once customers submit them
              </p>
            </div>
          ) : (
            <ScrollArea className="w-full">
              <Table data-ocid="bookings.table">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-bold text-brand-dark w-12">
                      #
                    </TableHead>
                    <TableHead className="font-bold text-brand-dark">
                      Customer
                    </TableHead>
                    <TableHead className="font-bold text-brand-dark">
                      Phone
                    </TableHead>
                    <TableHead className="font-bold text-brand-dark">
                      Pickup
                    </TableHead>
                    <TableHead className="font-bold text-brand-dark">
                      Drop
                    </TableHead>
                    <TableHead className="font-bold text-brand-dark">
                      Service
                    </TableHead>
                    <TableHead className="font-bold text-brand-dark">
                      Car Type
                    </TableHead>
                    <TableHead className="font-bold text-brand-dark">
                      Date
                    </TableHead>
                    <TableHead className="font-bold text-brand-dark">
                      Time
                    </TableHead>
                    <TableHead className="font-bold text-brand-dark">
                      Status
                    </TableHead>
                    <TableHead className="font-bold text-brand-dark">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((booking: Booking, index: number) => (
                    <TableRow
                      key={String(booking.id)}
                      className="hover:bg-gray-50"
                      data-ocid={`bookings.row.${index + 1}`}
                    >
                      <TableCell className="text-gray-500 text-sm">
                        {String(booking.id)}
                      </TableCell>
                      <TableCell className="font-semibold text-brand-dark">
                        {booking.name}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {booking.phone}
                      </TableCell>
                      <TableCell className="text-gray-600 max-w-[120px] truncate">
                        {booking.pickupLocation}
                      </TableCell>
                      <TableCell className="text-gray-600 max-w-[120px] truncate">
                        {booking.dropLocation}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="text-xs border-brand-yellow text-brand-dark"
                        >
                          {booking.serviceType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {(booking as any).carType || "-"}
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {booking.date}
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {booking.time}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            booking.status === Status.completed
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-orange-100 text-orange-800 hover:bg-orange-100"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {booking.status !== Status.completed && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleComplete(booking.id)}
                              disabled={completeMutation.isPending}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 p-1.5"
                              data-ocid={`bookings.save_button.${index + 1}`}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            asChild
                            className="text-green-500 hover:text-green-700 hover:bg-green-50 p-1.5"
                            data-ocid={`bookings.secondary_button.${index + 1}`}
                          >
                            <a
                              href={buildWhatsAppUrl(booking.phone)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(booking.id)}
                            disabled={deleteMutation.isPending}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5"
                            data-ocid={`bookings.delete_button.${index + 1}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </div>
      </main>
    </div>
  );
}
