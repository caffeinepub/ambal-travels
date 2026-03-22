import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitBooking } from "../hooks/useQueries";

interface BookingFormProps {
  dark?: boolean;
}

export function BookingForm({ dark = false }: BookingFormProps) {
  const { mutateAsync, isPending } = useSubmitBooking();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    date: "",
    time: "",
    serviceType: "",
  });

  const inputClass = dark
    ? "bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-brand-yellow"
    : "bg-white border-gray-200 text-gray-900";
  const labelClass = dark ? "text-gray-300" : "text-gray-700";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.phone ||
      !form.pickupLocation ||
      !form.dropLocation ||
      !form.date ||
      !form.time ||
      !form.serviceType
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await mutateAsync(form);
      toast.success("Booking confirmed! We'll contact you shortly.");
      setForm({
        name: "",
        phone: "",
        pickupLocation: "",
        dropLocation: "",
        date: "",
        time: "",
        serviceType: "",
      });
    } catch {
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="booking.card"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className={labelClass}>Full Name</Label>
          <Input
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className={inputClass}
            data-ocid="booking.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label className={labelClass}>Phone Number</Label>
          <Input
            placeholder="Your phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className={inputClass}
            data-ocid="booking.input"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className={labelClass}>Pickup Location</Label>
        <Input
          placeholder="Enter pickup location"
          value={form.pickupLocation}
          onChange={(e) =>
            setForm((p) => ({ ...p, pickupLocation: e.target.value }))
          }
          className={inputClass}
          data-ocid="booking.input"
        />
      </div>
      <div className="space-y-1.5">
        <Label className={labelClass}>Drop Location</Label>
        <Input
          placeholder="Enter drop location"
          value={form.dropLocation}
          onChange={(e) =>
            setForm((p) => ({ ...p, dropLocation: e.target.value }))
          }
          className={inputClass}
          data-ocid="booking.input"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className={labelClass}>Date</Label>
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
            className={inputClass}
            data-ocid="booking.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label className={labelClass}>Time</Label>
          <Input
            type="time"
            value={form.time}
            onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
            className={inputClass}
            data-ocid="booking.input"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className={labelClass}>Service Type</Label>
        <Select
          value={form.serviceType}
          onValueChange={(v) => setForm((p) => ({ ...p, serviceType: v }))}
        >
          <SelectTrigger className={inputClass} data-ocid="booking.select">
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Local Trip">Local Trip</SelectItem>
            <SelectItem value="Outstation Trip">Outstation Trip</SelectItem>
            <SelectItem value="Airport Pickup">
              Airport Pickup & Drop
            </SelectItem>
            <SelectItem value="Hourly Rental">Hourly Rental</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-brand-yellow text-brand-dark font-bold hover:opacity-90 transition-opacity"
        data-ocid="booking.submit_button"
      >
        {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
        {isPending ? "Booking..." : "Book Now"}
      </Button>
    </form>
  );
}
