import { ChartBar } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuickStats({ className }: { className?: string }) {
  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartBar className="size-5" />
          <span>Quick Stats</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p>Active Jobs</p>
          <p className="font-semibold">12</p>
        </div>

        <hr />

        <div className="flex items-center justify-between">
          <p>Current Applications</p>
          <p className="font-semibold">85</p>
        </div>

        <hr />

        <div className="flex items-center justify-between">
          <p>Active Employees</p>
          <p className="font-semibold">85</p>
        </div>
      </CardContent>
    </Card>
  );
}
