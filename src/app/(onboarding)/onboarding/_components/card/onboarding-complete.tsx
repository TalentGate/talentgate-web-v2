import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CircleCheckBig, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function OnboardingCompleted({ decreaseStep }: { decreaseStep: () => void }) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Onboarding Completed</CardTitle>
        <CardDescription>Welcome aboard!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <CircleCheckBig className="mx-auto stroke-green-500 size-16" />

        <CardDescription className="text-bg-foreground">
          You are now ready to start hiring! First things first, let's set up your first job
          posting. Click the button below to proceed to the job creation page.
        </CardDescription>
      </CardContent>

      <CardFooter className="flex-col gap-4">
        <Button asChild className="w-full">
          <Link href={'/jobs'}>
            <span>Go to Jobs Page</span>
          </Link>
        </Button>

        <Button className="w-full" onClick={decreaseStep} variant="ghost">
          <ArrowLeft />
          <span>Previous Step</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default OnboardingCompleted;
