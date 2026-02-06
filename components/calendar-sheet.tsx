"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { toast } from "sonner";

interface CalendarSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CalendarSheet({
  open,
  onOpenChange,
}: CalendarSheetProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      toast.success(`Date selected: ${format(date, "MMMM d, yyyy")}`, {
        position: "bottom-right",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 overflow-y-auto top-[70px]! border-0"
        style={{ 
          height: "calc(100vh - 70px)",
          backgroundColor: "#0D0D0D",
        }}
        showCloseButton={false}
      >
        <div className="px-4 py-3 flex flex-row items-center justify-between" style={{ backgroundColor: "#171717" }}>
          <SheetClose className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Calendar</span>
          </SheetClose>
          <SheetClose className="text-white/70 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </SheetClose>
          <SheetTitle className="sr-only">Calendar</SheetTitle>
        </div>

        <div className="p-6 calendar-sheet flex flex-col items-center" style={{ backgroundColor: "#0D0D0D" }}>
          <div className="flex items-center justify-center gap-4 mb-6 w-full">
            <button
              onClick={handlePreviousMonth}
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-white min-w-[160px] text-center">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button
              onClick={handleNextMonth}
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <style dangerouslySetInnerHTML={{
            __html: `
              .calendar-sheet .rdp-cell {
                border: 0.5px solid #242424 !important;
              }
              .calendar-sheet .rdp-day_today,
              .calendar-sheet .rdp-day_today button,
              .calendar-sheet [data-today="true"],
              .calendar-sheet [data-today="true"] button {
                background: transparent !important;
                background-color: transparent !important;
                color: rgba(255, 255, 255, 0.7) !important;
              }
              .calendar-sheet .rdp-day_today span,
              .calendar-sheet [data-today="true"] span {
                background: transparent !important;
                background-color: transparent !important;
              }
              .calendar-sheet .rdp-table {
                margin: 0 auto;
              }
            `
          }} />
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="bg-transparent"
            classNames={{
              months: "flex flex-col w-fit",
              month: "space-y-4 w-fit",
              caption: "hidden",
              caption_label: "hidden",
              nav: "hidden",
              nav_button: "hidden",
              nav_button_previous: "hidden",
              nav_button_next: "hidden",
              table: "border-collapse mx-auto",
              head_row: "flex mb-0",
              head_cell:
                "text-white/70 text-xs font-normal w-[90px] h-[30px] flex items-center justify-start px-2",
              row: "flex w-full",
              cell: "w-[90px] h-[50px] flex items-start justify-start p-0 relative calendar-cell",
              day: "w-full h-full flex items-start justify-start p-2 text-white/70 text-sm font-normal",
              day_selected: "",
              day_today: "text-white/70 !bg-transparent",
              day_outside: "text-white/30",
              day_disabled: "text-white/20",
              day_range_middle: "bg-transparent",
              day_hidden: "invisible",
            }}
            components={{
              DayButton: ({ day, modifiers, ...props }) => {
                const isSelected =
                  selectedDate &&
                  format(day.date, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd");
                const isToday = modifiers.today;
                const dayNumber = format(day.date, "d");

                return (
                  <button
                    {...props}
                    className={`w-full h-full flex items-start justify-start p-2 text-sm font-normal transition-colors ${
                      isSelected
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                    style={isToday ? { backgroundColor: "transparent" } : undefined}
                  >
                    {isSelected ? (
                      <span
                        className="text-white rounded-[200px] w-[28px] h-[16px] flex items-center justify-center text-sm font-normal"
                        style={{ 
                          backgroundColor: "#2525E6",
                          borderRadius: "200px" 
                        }}
                      >
                        {dayNumber}
                      </span>
                    ) : (
                      dayNumber
                    )}
                  </button>
                );
              },
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
