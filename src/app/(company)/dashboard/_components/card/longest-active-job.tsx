import { Clock } from 'lucide-react';

import { Card, CardContent, CardDescription } from '@/components/ui/card';

const LongestActiveJob = () => {
  return (
    <Card className="h-fit">
      <CardContent className="flex justify-between items-center">
        <div>
          <CardDescription className="text-nowrap">Avg. Time to Hire</CardDescription>
          <p className="text-xl font-bold">21 days</p>
        </div>
        <Clock className="size-8" />
      </CardContent>
    </Card>
  );
};

export default LongestActiveJob;
