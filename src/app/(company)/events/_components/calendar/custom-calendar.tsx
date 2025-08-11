"use client";

import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
  // isSameDay,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { Plus } from "lucide-react";
import React, { useState, useMemo } from "react";

import EventDialog from "@/app/(company)/events/_components/dialog/event-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const dummyEvents = [
  {
    id: "1",
    title: "Interview: Jane Doe (Frontend)",
    date: new Date(2025, 6, 28, 10, 0),
    description: "First round interview for Senior Frontend Engineer.",
    type: "interview",
  },
  {
    id: "2",
    title: "Team Sync",
    date: new Date(2025, 6, 28, 14, 30),
    description: "Weekly team synchronization meeting.",
    type: "meeting",
  },
  {
    id: "3",
    title: "Code Review: Project X",
    date: new Date(2025, 6, 29, 11, 0),
    description: "Review pull requests for Project X.",
    type: "code-review",
  },
  {
    id: "4",
    title: "Interview: John Smith (Backend)",
    date: new Date(2025, 6, 30, 9, 30),
    description: "Second round interview for Lead Backend Developer.",
    type: "interview",
  },
  {
    id: "5",
    title: "ATS Feature Brainstorm",
    date: new Date(2025, 7, 1, 15, 0),
    description: "Brainstorming session for new ATS features.",
    type: "meeting",
  },
  {
    id: "6",
    title: "Holiday: Independence Day",
    date: new Date(2025, 6, 4),
    description: "Public holiday.",
    type: "holiday",
  },
  {
    id: "7",
    title: "Deadline: Q3 Reports",
    date: new Date(2025, 7, 5),
    description: "Submission deadline for quarterly reports.",
    type: "deadline",
  },
];

interface Event {
  id: string;
  title: string;
  date: Date;
  description?: string;
  type?:
    | "interview"
    | "meeting"
    | "code-review"
    | "holiday"
    | "deadline"
    | string;
}

interface CustomCalendarProps {
  events?: Event[];
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  events = dummyEvents,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isEventDialogOpen, setEventDialogOpen] = useState(false);

  const daysInMonthGrid = useMemo(() => {
    const startOfCurrentMonth = startOfMonth(currentMonth);
    const endOfCurrentMonth = endOfMonth(currentMonth);

    const startDay = startOfWeek(startOfCurrentMonth, {
      locale: enUS,
      weekStartsOn: 1,
    });
    const endDay = endOfWeek(endOfCurrentMonth, {
      locale: enUS,
      weekStartsOn: 1,
    });

    return eachDayOfInterval({ start: startDay, end: endDay });
  }, [currentMonth]);

  const eventsByDay = useMemo(() => {
    const grouped = new Map<string, Event[]>();
    events.forEach((event) => {
      const dayKey = format(event.date, "yyyy-MM-dd");
      if (!grouped.has(dayKey)) {
        grouped.set(dayKey, []);
      }
      grouped.get(dayKey)?.push(event);
    });
    return grouped;
  }, [events]);

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => subMonths(prevMonth, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const getEventTypeClasses = (type: string | undefined) => {
    switch (type) {
      case "interview":
        return "bg-green-100 text-green-800 border-green-200";
      case "meeting":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "code-review":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "holiday":
        return "bg-red-100 text-red-800 border-red-200";
      case "deadline":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto shadow-lg rounded-xl overflow-hidden">
        <Button
          className="w-fit self-end mr-4"
          onClick={() => setEventDialogOpen(true)}
        >
          <Plus />
          <span>Add Event</span>
        </Button>

        <CardHeader className="flex flex-row items-center justify-between p-4 bg-card border-b">
          <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
            Previous
          </Button>
          <CardTitle className="text-2xl font-bold">
            {format(currentMonth, "MMMM yyyy", { locale: enUS })}
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={goToNextMonth}>
              Next
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2 text-center font-semibold text-sm ">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {daysInMonthGrid.map((day, index) => {
              const dayKey = format(day, "yyyy-MM-dd");
              const dayEvents = eventsByDay.get(dayKey) || [];
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isTodayDay = isToday(day);

              return (
                <div
                  key={index}
                  className={`
                      h-32 p-2 border rounded-sm flex flex-col relative transition ease-in-out hover:opacity-60
                      ${
                        isCurrentMonth
                          ? "bg-background border-accent"
                          : "bg-card border-accent"
                      }
                      ${isTodayDay ? "bg-primary" : ""}
                      hover:shadow-md
                    `}
                >
                  <span
                    className={`
                      text-sm font-medium self-end
                      ${isTodayDay ? "text-accent" : ""}
                    `}
                  >
                    {format(day, "d")}
                  </span>
                  <div className="flex flex-col mt-1 space-y-1 overflow-hidden">
                    {dayEvents.slice(0, 2).map(
                      (
                        event // Show up to 2 events directly
                      ) => (
                        <div
                          key={event.id}
                          className={`
                            text-xs px-1.5 py-0.5 rounded-sm truncate
                            ${getEventTypeClasses(event.type)}
                            border
                          `}
                          title={event.title} // Tooltip on hover
                        >
                          {format(event.date, "HH:mm")} {event.title}
                        </div>
                      )
                    )}
                    {dayEvents.length > 2 && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-xs text-blue-600 self-start"
                          >
                            +{dayEvents.length - 2} more
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-2 bg-white shadow-lg rounded-md z-50">
                          <h4 className="font-semibold text-sm mb-2">
                            Events on {format(day, "MMM d, yyyy")}
                          </h4>
                          <div className="space-y-1">
                            {dayEvents.map((event) => (
                              <div key={event.id} className="text-xs">
                                <span className="font-medium">
                                  {format(event.date, "HH:mm")}
                                </span>{" "}
                                - {event.title}
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <EventDialog open={isEventDialogOpen} setOpen={setEventDialogOpen} />
    </>
  );
};

export default CustomCalendar;
