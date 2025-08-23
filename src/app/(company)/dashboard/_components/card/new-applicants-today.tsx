import { UserPlus } from 'lucide-react';

import { Card, CardContent, CardDescription } from '@/components/ui/card';

const NewApplicantsToday = () => {
  return (
    <Card className="h-fit">
      <CardContent className="flex justify-between items-center">
        <div>
          <CardDescription className="text-nowrap">New Applicants Today</CardDescription>
          <p className="text-xl font-bold">25</p>
        </div>
        <span className="bg-yellow-600/50 rounded-md p-2">
          <UserPlus className="size-8 stroke-yellow-200" />
        </span>
      </CardContent>
    </Card>
  );
};

export default NewApplicantsToday;
