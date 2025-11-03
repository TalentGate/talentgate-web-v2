'use client';

import Link from 'next/link';

import { ColumnDef } from '@tanstack/react-table';
import { CircleCheck, MoreHorizontal, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
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

export type DataTableEmployeeType = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  title: string;
  role: 'OWNER' | 'ADMIN';
  verified: boolean;
};

export const columns: ColumnDef<DataTableEmployeeType>[] = [
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
    accessorKey: 'username',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Username" />;
    },
  },
  {
    accessorKey: 'firstname',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="First Name" />;
    },
  },
  {
    accessorKey: 'lastname',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Last Name" />;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Title" />;
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Role" />;
    },
    cell: ({ row }) => {
      const role: string = row.getValue('role');
      return <p className="capitalize">{role.toLowerCase()}</p>;
    },
  },
  {
    accessorKey: 'verified',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Verified" />;
    },
    cell: ({ row }) => {
      const verified = row.getValue('verified');
      return (
        <div>
          <CircleCheck className={verified ? 'fill-green-500 stroke-secondary' : ''} />
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const employee = row.original;

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(employee.id)}>
                Copy employee ID
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/company/employees/${employee.id}`}>View employee details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">Remove Employee</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
