'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SetMeetingProps {
  children: React.ReactNode;
}

const SetMeeting = ({ children }: SetMeetingProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set a New Meeting</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Label>Meeting Title</Label>
          <Input placeholder="Meeting Title"></Input>
        </div>

        <div className="flex gap-4">
          <div className="space-y-2 w-full">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  <CalendarIcon />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="time">Time</Label>
            <Input
              type="time"
              id="time"
              step="1"
              defaultValue="10:30:00"
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </div>
        <DialogFooter className="w-full">
          <Button className="w-full">Set Meeting</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SetMeeting;
