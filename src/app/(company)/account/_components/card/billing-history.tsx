'use client';

import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// import { useRetrieveInvoiceDocumentMutation } from '@/app/(company)/company/billing-and-subscription/_lib/slice';

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

// function BillingHistory({ invoices }: InvoicesProps) {
function BillingHistory() {
  const invoices = [
    {
      transaction_id: '11',
      invoice_id: '11',
      invoice_number: '22',
      total: '22',
      currency_code: 'kk',
      status: 'Completed',
      billed_at: 'aaa',
    },
    {
      transaction_id: '11',
      invoice_id: '11',
      invoice_number: '22',
      total: '22',
      currency_code: 'kk',
      status: 'Failed',
      billed_at: 'aaa',
    },
    {
      transaction_id: '11',
      invoice_id: '11',
      invoice_number: '22',
      total: '22',
      currency_code: 'kk',
      status: 'Completed',
      billed_at: 'aaa',
    },
  ];
  // const [
  //   retrieveInvoiceDocument,
  //   { data: retrieveInvoiceDocumentData, isLoading: isRetrieveInvoiceDocumentLoading },
  // ] = useRetrieveInvoiceDocumentMutation();

  const handleClick = async (transaction_id: string | undefined) => {
    try {
      // Get PDF as blob
      const pdfBlob = ''; // await retrieveInvoiceDocument(transaction_id).unwrap(); // see note below

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
    <>
      <Card>
        <CardHeader>
          <CardTitle className={'text-xl'}>Billing History</CardTitle>
          <CardDescription>See a complete timeline of your billing activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4"></CardContent>
        <CardContent className="space-y-4">
          <section>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Number</TableHead>
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
                      {invoice.status === 'Completed' ? (
                        <Badge className="bg-green-600/10 text-green-600 font-semibold">
                          <span>{invoice.status}</span>
                        </Badge>
                      ) : (
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
                        <span>View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        </CardContent>
      </Card>
    </>
  );
}

export default BillingHistory;
