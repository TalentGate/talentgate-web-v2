import Link from 'next/link';

import { ArrowRight, Building, Clock, Laptop, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const JobItem = () => {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>Quality Assurance Engineer</CardTitle>
        <CardDescription className="flex items-center gap-4 flex-wrap">
          <Badge variant={'outline'}>
            <Building className="size-5" />
            Engineering
          </Badge>
          <Badge variant={'outline'}>
            <Laptop className="size-5" />
            Remote
          </Badge>
          <Badge variant={'outline'}>
            <Clock className="size-5" />
            Full-Time
          </Badge>
          <Badge variant={'outline'}>
            <MapPin className="size-5" />
            Istanbul, Turkey
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Join our dynamic team as a Quality Assurance Engineer, ensuring the highest quality
          standards for our products. You will collaborate with cross-functional teams to develop
          and implement testing processes in a fast-paced, innovative environment.
        </CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>
          <CardDescription className="font-bold text-primary">120K$ - 150K$</CardDescription>
          <CardDescription>Posted Jan 15, 2024 </CardDescription>
        </div>

        <Button asChild>
          <Link href={'/careers/1'}>
            <span>View Details</span>
            <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const JobGrid = () => {
  return (
    <section className="grid lg:grid-cols-2 gap-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <JobItem key={index} />
      ))}
    </section>
  );
};

export default JobGrid;
