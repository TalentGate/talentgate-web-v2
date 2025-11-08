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
import { useRetrieveInvoiceDocumentMutation } from '@/app/(company)/company/billing-and-subscription/_lib/slice';

type InvoicesProps = {
  invoices?: {
    transaction_id?: string;
    invoice_id?: string;
    invoice_number?: string;
    total?: string;
    currency_code?: string;
    status?: string;
    billed_at?: string;
  }[];
};

function Invoices({ invoices }: InvoicesProps) {
  const [tablePage, setTablePage] = useState(1);

  const [
    retrieveInvoiceDocument,
    { data: retrieveInvoiceDocumentData, isLoading: isRetrieveInvoiceDocumentLoading },
  ] = useRetrieveInvoiceDocumentMutation();

  const handleClick = async (transaction_id: string | undefined) => {
    try {
      // Get PDF as blob
      const pdfBlob = await retrieveInvoiceDocument(transaction_id).unwrap(); // see note below

      // Create blob URL
      const url = URL.createObjectURL(pdfBlob);

      // Open in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error(err);
      alert('Failed to retrieve invoice PDF');
    }
  };

  return (
    <section>
      <div className="w-full border rounded-md bg-background">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Number</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Billing Date</TableHead>
              <TableHead className="text-right">Document</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {invoices?.map((invoice) => (
              <TableRow key={invoice.transaction_id}>
                <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                <TableCell className="font-bold">{invoice.total}</TableCell>
                <TableCell>
                  {invoice.status === 'Completed' && (
                    <Badge className="bg-green-600/10 text-green-600 font-semibold">
                      <span>{invoice.status}</span>
                    </Badge>
                  )}
                  {invoice.status === 'completed' && (
                    <Badge className="bg-blue-600/10 text-blue-600 font-semibold">
                      <span>{invoice.status.toUpperCase()}</span>
                    </Badge>
                  )}
                  {invoice.status === 'Completed' && (
                    <Badge className="bg-red-600/10 text-red-600 font-semibold">
                      <span>{invoice.status}</span>
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{invoice.billed_at?.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      await handleClick(invoice.transaction_id);
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
