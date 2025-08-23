import { Star } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

const Evaluation = () => {
  return (
    <Card className="bg-background">
      <CardHeader>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <CardTitle>Human Resources</CardTitle>
        </div>
        <CardDescription>1 day ago</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-primary">Evaluation</p>
      </CardContent>
      <CardFooter>
        <Label>
          <Star className="stroke-yellow-400 fill-yellow-400" />
          <span>Applicant Rated:</span>
          <span className="font-bold">4.5</span>
        </Label>
      </CardFooter>
    </Card>
  );
};

const Evaluations = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evaluations</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Evaluation key={index} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Evaluations;
