import { CalendarClock } from 'lucide-react';

import { Card, CardContent, CardDescription } from '@/components/ui/card';

const AverageTimeToHire = () => {
  return (
    <Card className="h-fit">
      <CardContent className="flex justify-between items-center">
        <div>
          <CardDescription className="text-nowrap">Longest Active Job</CardDescription>
          <p className="text-xl font-bold">QA Engineer</p>
        </div>
        <CalendarClock className="size-8" />
      </CardContent>
    </Card>
  );
};

export default AverageTimeToHire;
