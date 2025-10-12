'use client';

import { ChevronLeft, ChevronRight, EyeIcon } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type InvoicesProps = {
  invoices?: {
    id: string;
    number: string;
    amount: string;
    status: string;
    billingDate: Date;
  }[];
};

function Invoices({ invoices }: InvoicesProps) {
  const [tablePage, setTablePage] = useState(1);

  return (
    <section>
      <div className="w-full border rounded-md bg-background">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Billing Date</TableHead>
              <TableHead className="text-right">View Invoice?</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {invoices?.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.number}</TableCell>
                <TableCell>
                  {invoice.status === 'Paid' && (
                    <Badge className="bg-green-600/10 text-green-600 font-semibold">
                      <span>{invoice.status}</span>
                    </Badge>
                  )}
                  {invoice.status === 'Pending' && (
                    <Badge className="bg-blue-600/10 text-blue-600 font-semibold">
                      <span>{invoice.status}</span>
                    </Badge>
                  )}
                  {invoice.status === 'Overdue' && (
                    <Badge className="bg-red-600/10 text-red-600 font-semibold">
                      <span>{invoice.status}</span>
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="font-bold">{invoice.amount}</TableCell>
                <TableCell>{invoice.billingDate.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      alert(`Viewing invoice ${invoice.number}`);
                    }}
                  >
                    <EyeIcon />
                    <span>View</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center items-center pt-4 w-full h-fit">
        <Button
          variant="ghost"
          disabled={tablePage === 1}
          onClick={() => setTablePage((p) => p - 1)}
        >
          <ChevronLeft />
        </Button>

        <span className="px-2">{tablePage}</span>

        <Button variant="ghost" onClick={() => setTablePage((p) => p + 1)}>
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
}

export default Invoices;
