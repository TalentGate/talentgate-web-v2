import { Briefcase } from 'lucide-react';

import { Card, CardContent, CardDescription } from '@/components/ui/card';

const TotalActiveJobs = () => {
  return (
    <Card className="h-fit">
      <CardContent className="flex justify-between items-center">
        <div>
          <CardDescription>Total Active Jobs</CardDescription>
          <p className="text-xl font-bold">4</p>
        </div>
        <span className="bg-blue-600/50 rounded-md p-2">
          <Briefcase className="size-8 stroke-blue-200" />
        </span>
      </CardContent>
    </Card>
  );
};

export default TotalActiveJobs;
