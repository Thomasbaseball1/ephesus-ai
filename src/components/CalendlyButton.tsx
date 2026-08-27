"use client";

import BookingDialog from "@/components/BookingDialog";

interface CalendlyButtonProps {
  children: React.ReactNode;
}

export default function CalendlyButton({ children }: CalendlyButtonProps) {
  return <BookingDialog>{children}</BookingDialog>;
}
