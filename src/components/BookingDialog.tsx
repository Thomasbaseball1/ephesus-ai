"use client";

import { useEffect, useState } from "react";
import { Calendar, CheckCircle2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const TIME_SLOTS = [
  "9:00 AM - 9:45 AM",
  "10:00 AM - 10:45 AM",
  "11:00 AM - 11:45 AM",
  "12:00 PM - 12:45 PM",
  "1:00 PM - 1:45 PM",
  "2:00 PM - 2:45 PM",
  "3:00 PM - 3:45 PM",
  "4:00 PM - 4:45 PM",
  "5:00 PM - 5:45 PM",
];

interface BookingDialogProps {
  children: React.ReactNode;
}

type AvailabilityResponse = {
  timeSlots: { slot: string; available: boolean }[];
  googleCalendarConfigured: boolean;
  googleCalendarWarning?: string | null;
};

export default function BookingDialog({ children }: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<Record<string, boolean>>({});
  const [googleCalendarConfigured, setGoogleCalendarConfigured] = useState<boolean | null>(null);
  const [googleCalendarWarning, setGoogleCalendarWarning] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    notes: "",
  });

  useEffect(() => {
    if (!selectedDate) {
      setAvailableSlots({});
      setGoogleCalendarConfigured(null);
      setGoogleCalendarWarning(null);
      return;
    }

    let cancelled = false;
    const date = format(selectedDate, "yyyy-MM-dd");
    setIsLoadingAvailability(true);
    setSelectedTimeSlot("");

    fetch(`/api/bookings/availability?date=${encodeURIComponent(date)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load availability");
        return response.json() as Promise<AvailabilityResponse>;
      })
      .then((data) => {
        if (cancelled) return;
        setAvailableSlots(Object.fromEntries(data.timeSlots.map((item) => [item.slot, item.available])));
        setGoogleCalendarConfigured(data.googleCalendarConfigured);
        setGoogleCalendarWarning(data.googleCalendarWarning ?? null);
      })
      .catch(() => {
        if (cancelled) return;
        setAvailableSlots(Object.fromEntries(TIME_SLOTS.map((slot) => [slot, true])));
        setGoogleCalendarConfigured(null);
        setGoogleCalendarWarning("Availability could not be loaded. Booking may still be submitted.");
        toast.error("Availability could not be loaded. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setIsLoadingAvailability(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    if (!selectedTimeSlot) {
      toast.error("Please select a time slot");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          date: format(selectedDate, "yyyy-MM-dd"),
          timeSlot: selectedTimeSlot,
          notes: formData.notes || null,
          status: "pending",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to book consultation");
      }

      const booking = await response.json();
      const calendarMessage = booking.googleCalendar?.eventCreated
        ? " Google Calendar invite sent."
        : booking.googleCalendar?.warning
          ? " Booking saved; calendar invite needs attention."
        : " We'll contact you soon.";

      toast.success(`Consultation booked successfully!${calendarMessage}`);
      
      // Reset form
      setFormData({ name: "", email: "", company: "", notes: "" });
      setSelectedDate(undefined);
      setSelectedTimeSlot("");
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to book consultation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Schedule a Consultation</DialogTitle>
          <DialogDescription>
            Book a 45-minute consultation with our AI experts. Select your preferred date and time.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your company name (optional)"
              />
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Select Date *</Label>
            <div className="border rounded-lg p-4 flex justify-center">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={{ before: new Date() }}
                className="rdp-custom"
              />
            </div>
            {selectedDate && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Selected: {format(selectedDate, "MMMM d, yyyy")}
                </p>
                {googleCalendarConfigured !== null && (
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
                    {googleCalendarConfigured
                      ? "Availability is checking your Google Calendar."
                      : "Google Calendar credentials are not configured yet; booking still saves to the CRM."}
                  </p>
                )}
                {googleCalendarWarning && (
                  <p className="text-sm text-amber-300">
                    {googleCalendarWarning}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Time Slot Selection */}
          <div className="space-y-2">
            <Label>Select Time Slot (45 minutes) *</Label>
            {isLoadingAvailability && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking availability...
              </p>
            )}
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map((slot) => {
                const isAvailable = selectedDate ? availableSlots[slot] !== false : true;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={!selectedDate || isLoadingAvailability || !isAvailable}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`min-h-12 rounded-lg border p-3 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-45 ${
                      selectedTimeSlot === slot
                        ? "bg-[#0D9488] text-white border-transparent"
                        : "hover:border-[#0D9488] hover:bg-secondary"
                    }`}
                  >
                    <span className="block">{slot}</span>
                    {!isAvailable && <span className="mt-1 block text-xs">Booked</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Tell us what you'd like to discuss..."
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2DD4BF] hover:bg-[#0F766E] text-white"
            size="lg"
          >
            {isSubmitting ? "Booking..." : "Confirm Booking"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
