'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import Header from '@/components/section/header';
import { Button } from '@/components/ui/button';

import { columns, EventType } from './_components/table/columns';
import { DataTable } from './_components/table/data-table';
import EventDialog from '../_components/dialog/event-dialog';

const dummyEvents: EventType[] = [
  {
    id: '1',
    title: 'Interview: Jane Doe (Frontend)',
    date: new Date(2025, 6, 28, 10, 0),
    description: 'First round interview for Senior Frontend Engineer.',
    link: 'https://zoom.us/j/1234567890',
    attendees: ['Jane Doe', 'Alice Smith'],
  },
  {
    id: '2',
    title: 'Team Sync',
    date: new Date(2025, 6, 28, 14, 30),
    description: 'Weekly team synchronization meeting.',
    link: 'https://meet.google.com/abc-defg-hij',
    attendees: ['Bob Johnson', 'Carol Lee'],
  },
  {
    id: '3',
    title: 'Code Review: Project X',
    date: new Date(2025, 6, 29, 11, 0),
    description: 'Review pull requests for Project X.',
    link: 'https://zoom.us/j/0987654321',
    attendees: ['David Kim', 'Eve Turner'],
  },
  {
    id: '4',
    title: 'Interview: John Smith (Backend)',
    date: new Date(2025, 6, 30, 9, 30),
    description: 'Second round interview for Lead Backend Developer.',
    link: 'https://meet.google.com/xyz-pqrs-tuv',
    attendees: ['John Smith', 'Frank Miller'],
  },
  {
    id: '5',
    title: 'ATS Feature Brainstorm',
    date: new Date(2025, 7, 1, 15, 0),
    description: 'Brainstorming session for new ATS features.',
    link: 'https://zoom.us/j/1122334455',
    attendees: ['Grace Lee', 'Henry Adams'],
  },
  {
    id: '6',
    title: 'Holiday: Independence Day',
    date: new Date(2025, 6, 4),
    description: 'Public holiday.',
    link: 'https://meet.google.com/holiday-independence',
    attendees: ['Ivy Chen', 'Jack Brown'],
  },
  {
    id: '7',
    title: 'Deadline: Q3 Reports',
    date: new Date(2025, 7, 5),
    description: 'Submission deadline for quarterly reports.',
    link: 'https://zoom.us/j/5566778899',
    attendees: ['Karen White', 'Leo Green'],
  },
];

function EventList() {
  const [isEventDialogOpen, setEventDialogOpen] = useState(false);

  return (
    <>
      <main className="p-6 space-y-6 w-full h-full">
        <Header
          header={'Event List'}
          description={'You can view, set, edit and delete events in a list view.'}
        />

        <Button className="w-fit self-end mr-4" onClick={() => setEventDialogOpen(true)}>
          <Plus />
          <span>Add Event</span>
        </Button>

        <DataTable columns={columns} data={dummyEvents} />
      </main>

      <EventDialog open={isEventDialogOpen} setOpen={setEventDialogOpen} />
    </>
  );
}

export default EventList;
