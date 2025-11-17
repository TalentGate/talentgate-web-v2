import { CreditCard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';

export default function CurrentPlan({ className }: { className?: string }) {
  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="size-5" />
          <span>Current Plan</span>
        </CardTitle>
        <CardDescription>Your active subscription details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <section className="flex items-center justify-between">
          <h1 className="font-bold text-xl">Trial</h1>
          <div className="flex flex-col">
            <p className="text-xl font-semibold">$0</p>
            <span className="text-muted-foreground">per month</span>
          </div>
        </section>

        <hr />

        <section>
          <div className="flex items-center justify-between">
            <p className="">Subscription Status</p>
            <p className="font-semibold text-green-600">ACTIVE</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="">Next billing date</p>
            <p className="font-semibold">March 1, 2024</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="">Payment Info</p>
            <p className="font-semibold">**** **** **** 4242</p>
          </div>
        </section>
      </CardContent>

      <CardFooter className="w-full grid gap-4 grid-cols-1 md:flex md:flex-row md:w-fit">
        <Button variant="destructive" className="">
          Cancel Subscription
        </Button>
      </CardFooter>
    </Card>
  );
}
