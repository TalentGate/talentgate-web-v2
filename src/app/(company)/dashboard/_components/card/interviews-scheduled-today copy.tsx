import { Calendar } from 'lucide-react';

import { Card, CardContent, CardDescription } from '@/components/ui/card';

const InterviewsScheduledToday = () => {
  return (
    <Card className="h-fit">
      <CardContent className="flex justify-between items-center">
        <div>
          <CardDescription className="text-nowrap">Interviews Scheduled Today</CardDescription>
          <p className="text-xl font-bold">4</p>
        </div>
        <span className="bg-red-600/50 rounded-md p-2">
          <Calendar className="size-8 stroke-red-200" />
        </span>
      </CardContent>
    </Card>
  );
};

export default InterviewsScheduledToday;
