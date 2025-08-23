'use client';

import Link from 'next/link';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { DataTableColumnHeader } from './column-header';

export type DataTableApplicationType = {
  id: string;
  name: string;
  email: string;
  applied_position: string;
  applied_at: string;
  status: 'Applied' | 'Screening' | 'Reference Check' | 'Offer' | 'Interview' | 'Withdrawn';
  rating: number;
};

export const columns: ColumnDef<DataTableApplicationType>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  },
  {
    accessorKey: 'applied_position',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Applied Position" />;
    },
  },
  {
    accessorKey: 'applied_at',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Applied At" />;
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('applied_at'));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Rating" />;
    },
    cell: ({ row }) => {
      const rating: string = row.getValue('rating');
      return (
        <div className="flex items-center gap-1">
          <Star className="stroke-yellow-400 fill-yellow-400 size-4" />
          <span>{rating}/5</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const application = row.original;

      return (
        <div className="w-full flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/applications/${application.id}`}>View application details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(application.id)}>
                Copy application ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
