import { ArrowRight, DownloadIcon, ReceiptText } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function RecentInvoiceItem() {
  return (
    <div className="py-2 px-3 border-2 border-secondary rounded-md bg-secondary flex items-center justify-between shadow-sm">
      <div className="">
        <p className="font-semibold">Invoice #12345</p>
        <span className="text-muted-foreground">1/1/2025</span>
      </div>

      <div className="flex items-center gap-4">
        <Badge className="bg-green-600/10 font-semibold text-green-600">paid</Badge>
        <p className="font-bold text-lg">$150</p>
        <Button variant="ghost">
          <DownloadIcon />
        </Button>
      </div>
    </div>
  );
}

export default function RecentInvoices({
  className,
  setCurrentTab,
}: {
  className?: string;
  setCurrentTab: (tab: string) => void;
}) {
  return (
    <Card className={`${className}`}>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <ReceiptText className="size-5" />
            <span>Recent Invoices</span>
          </CardTitle>
          <CardDescription>Your last 3 invoices.</CardDescription>
        </div>
        <Button variant="link" onClick={() => setCurrentTab('billing-history')}>
          <span>View All</span>
          <ArrowRight />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <RecentInvoiceItem />
        <RecentInvoiceItem />
        <RecentInvoiceItem />
      </CardContent>
    </Card>
  );
}
