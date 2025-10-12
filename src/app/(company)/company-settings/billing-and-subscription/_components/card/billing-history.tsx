import { ReceiptText } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import Invoices from '../table/invoices';

const invoices = [
  {
    id: '1',
    number: 'INV-001',
    amount: '$100.00',
    status: 'Paid',
    billingDate: new Date('2024-01-01 14:03'),
  },
  {
    id: '2',
    number: 'INV-002',
    amount: '$150.00',
    status: 'Pending',
    billingDate: new Date('2024-02-01 15:15'),
  },
  {
    id: '3',
    number: 'INV-003',
    amount: '$200.00',
    status: 'Overdue',
    billingDate: new Date('2024-03-01 16:30'),
  },
];

export default function BillingHistory({ className }: { className?: string }) {
  return (
    <Card className={`${className}`}>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <ReceiptText className="size-5" />
            <span>Recent Invoices</span>
          </CardTitle>
          <CardDescription>All your past invoices and payments.</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="">
        <Invoices invoices={invoices} />
      </CardContent>
    </Card>
  );
}
