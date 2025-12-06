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
import { toast } from 'sonner';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { LoginError } from '@/app/(auth)/login/_lib/slice';
import {
  useRetrieveInvoicesMutation,
  useRetrieveInvoiceDocumentMutation,
} from '@/app/(company)/account/_lib/slice';

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
  const [
    retrieveInvoices,
    {
      data: retrieveInvoicesData,
      isLoading: isRetrieveInvoicesLoading,
      isSuccess: isRetrieveInvoicesSuccess,
    },
  ] = useRetrieveInvoicesMutation();
  const [retrieveInvoiceDocument, {}] = useRetrieveInvoiceDocumentMutation();

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

  React.useEffect(() => {
    try {
      retrieveInvoices({}).unwrap();
    } catch (err) {
      toast.error('Retrieve Invoices Failed', {
        description:
          ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
          'Something went wrong. Please try again later.',
      });
    }
  }, [retrieveInvoices]);

  const handleClick = async (transaction_id: string) => {
    try {
      const pdfBlob = await retrieveInvoiceDocument(transaction_id).unwrap(); // see note below
      const url = URL.createObjectURL(pdfBlob);
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
        <CardContent className="space-y-4">
          <section>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Number</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Billing Date</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {retrieveInvoicesData?.map((invoice) => (
                  <TableRow key={invoice.transaction_id}>
                    <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                    <TableCell className="font-medium uppercase">
                      {invoice.card_type} {'****'} {invoice.card_last4}
                    </TableCell>
                    <TableCell className="font-bold">
                      {invoice.total} {invoice.currency_code}
                    </TableCell>
                    <TableCell>
                      {invoice.status === 'completed' ? (
                        <Badge className="bg-green-600/10 text-green-600 font-semibold capitalize">
                          <span>{invoice.status}</span>
                        </Badge>
                      ) : (
                        <Badge className="bg-red-600/10 text-red-600 font-semibold">
                          <span>{invoice.status}</span>
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.billed_at * 1000).toLocaleDateString('en-US', {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                      })}
                    </TableCell>
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
