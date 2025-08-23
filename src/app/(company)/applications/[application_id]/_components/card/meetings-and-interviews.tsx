'use client';

import Link from 'next/link';

import { format } from 'date-fns';
import { CalendarIcon, ClockIcon, Users, Webcam } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

export const MeetingItem = () => {
  return (
    <Card className="bg-background">
      <CardHeader className="flex gap-6 items-center">
        <CardTitle>Meeting Title</CardTitle>
        <Badge>Scheduled</Badge>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-2">
        <CardDescription>
          <Label>
            <CalendarIcon />
            <span>Meeting Date</span>
          </Label>
        </CardDescription>

        <CardDescription>
          <Label>
            <ClockIcon />
            <span>Meeting Duration</span>
          </Label>
        </CardDescription>

        <CardDescription>
          <Label>
            <Users />
            <span>Meeting Attendees</span>
          </Label>
        </CardDescription>

        <CardDescription>
          <Label>
            <Webcam />
            <Link
              href={'/applications'}
              className="text-purple-400 hover:opacity-60 hover:underline"
            >
              Meeting Link
            </Link>
          </Label>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

const SetMeeting = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">
          <CalendarIcon />
          <span>Set a New Meeting</span>
        </Button>
      </DialogTrigger>
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

const MeetingsAndInterviews = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Meetings & Interviews</CardTitle>
        <SetMeeting />
      </CardHeader>
      <CardContent className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <MeetingItem key={index} />
        ))}
      </CardContent>
    </Card>
  );
};

export default MeetingsAndInterviews;
