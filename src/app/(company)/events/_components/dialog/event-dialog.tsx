"use client";

import { ChevronDownIcon, Plus, SaveIcon } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function DateAndTimePicker({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex gap-3 w-full">
      <div className="flex flex-col gap-3 w-1/2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className=" justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const compareDate = new Date(date);
                compareDate.setHours(0, 0, 0, 0);
                return compareDate < today;
              }}
              onSelect={(currentDate) => {
                if (currentDate) {
                  setDate(currentDate);
                  setOpen(false);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3 w-1/2">
        <Input
          type="time"
          id="time-picker"
          defaultValue={date?.toISOString().substring(11, 16) || ""}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          onChange={(e) => {
            const timeParts = e.target.value.split(":");
            const newDate = new Date(date);
            newDate.setHours(
              parseInt(timeParts[0]),
              parseInt(timeParts[1]),
              0,
              0
            );
          }}
        />
      </div>
    </div>
  );
}

function EventAttendees({
  attendees,
  setAttendees,
}: {
  attendees: string[];
  setAttendees?: (attendees: string[]) => void;
}) {
  return (
    <section className="space-y-4">
      {attendees.map((_, index) => (
        <Input
          key={index}
          placeholder={`Attendee ${index + 1} Email`}
          className="bg-background w-full"
          defaultValue={attendees[index] || ""}
        />
      ))}
      <Button
        variant={"secondary"}
        className="w-full"
        onClick={() => {
          setAttendees?.([...attendees, ""]);
        }}
      >
        <Plus />
        <span>Add another attendee</span>
      </Button>
    </section>
  );
}

type EditEventFieldsSchema = {
  title: string;
  link?: string;
  date: Date;
  attendees: string[];
};

function EventDialog({
  open,
  setOpen,
  eventFields,
}: {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  eventFields?: EditEventFieldsSchema;
}) {
  const [title, setTitle] = useState<string>(eventFields?.title || "");
  const [link, setLink] = useState<string>(eventFields?.link || "");
  const [date, setDate] = useState<Date>(eventFields?.date || new Date());
  const [attendees, setAttendees] = useState<string[]>(
    eventFields?.attendees || ["", ""]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {eventFields ? (
          <DialogTitle>Edit Event</DialogTitle>
        ) : (
          <DialogTitle>Add New Event</DialogTitle>
        )}

        <section className="space-y-6">
          <div className="space-y-2">
            <Label>Event Title</Label>
            <Input
              placeholder="Event Title"
              defaultValue={title}
              onChange={(value) => {
                setTitle(value.target.value);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>Event Link (for e.g. Zoom or Google Meet Link)</Label>
            <Input
              placeholder="Event Link"
              defaultValue={link}
              onChange={(value) => {
                setLink(value.target.value);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-date">Event Date & Time</Label>
            <DateAndTimePicker date={date} setDate={setDate} />
          </div>

          <div className="space-y-2">
            <Label>Atendees Emails</Label>
            <EventAttendees attendees={attendees} setAttendees={setAttendees} />
          </div>
        </section>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setOpen?.(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit">
            <SaveIcon />
            <span>Save Event</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EventDialog;
