'use client';

// import Link from "next/link";

import { ColumnDef } from '@tanstack/react-table';
// import { set } from "date-fns";
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
// import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { DataTableColumnHeader } from './column-header';
import EventDialog from '../../../_components/dialog/event-dialog';

export interface EventType {
  id: string;
  title: string;
  date: Date;
  description?: string;
  link?: string;
  attendees?: string[];
}

function ActionsCell() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  return (
    <div className="w-full flex items-center justify-end">
      <DropdownMenu open={dropdownMenuOpen} onOpenChange={setDropdownMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setDialogOpen(!dialogOpen);
              setDropdownMenuOpen(false);
            }}
          >
            View event details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EventDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        eventFields={{
          title: 'Sample Event',
          date: new Date('2023-10-01T10:00:00'),
          link: 'https://example.com',
          attendees: ['john.doe@gmail.com', 'jane.smith@gmail.com', 'jane.smith@gmail.com'],
        }}
      />
    </div>
  );
}

export const columns: ColumnDef<EventType>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Title" />;
    },
    cell: ({ row }) => {
      const event = row.original;
      return <p className="font-semibold">{event.title}</p>;
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date & Time" />;
    },
    cell: ({ row }) => {
      const event = row.original;
      return <p className="text-muted-foreground">{event.date.toLocaleString()}</p>;
    },
  },
  {
    accessorKey: 'link',
    // header: ({ column }) => {
    //   return <DataTableColumnHeader column={column} title="Link" />;
    // },
    header: () => <div>Link</div>,
    cell: ({ row }) => {
      const event = row.original;
      return (
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {event.link}
        </a>
      );
    },
  },
  {
    accessorKey: 'attendees',
    // header: ({ column }) => {
    //   return <DataTableColumnHeader column={column} title="Attendees" />;
    // },
    header: () => <div>Attendees</div>,
    cell: ({ row }) => {
      const event = row.original;
      return <p className="text-muted-foreground">{event.attendees?.toString()}</p>;
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: () => <ActionsCell />,
  },
];
