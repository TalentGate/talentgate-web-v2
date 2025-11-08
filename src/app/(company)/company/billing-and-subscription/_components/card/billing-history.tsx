import { ReceiptText } from 'lucide-react';
import React from 'react';

import { useRetrieveInvoicesMutation } from '@/app/(company)/company/billing-and-subscription/_lib/slice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import Invoices from '../table/invoices';

export default function BillingHistory({ className }: { className?: string }) {
  const [
    retrieveInvoices,
    {
      data: retrieveInvoicesData,
      isLoading: isRetrieveInvoicesLoading,
      isSuccess: isRetrieveInvoicesSuccess,
    },
  ] = useRetrieveInvoicesMutation();

  React.useEffect(() => {
    retrieveInvoices({}).unwrap();
  }, [retrieveInvoices]);

  return (
    <Card className={`${className}`}>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <ReceiptText className="size-5" />
            <span>Invoices</span>
          </CardTitle>
          <CardDescription>All your past invoices and payments.</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="">
        <Invoices invoices={retrieveInvoicesData} />
      </CardContent>
    </Card>
  );
}
