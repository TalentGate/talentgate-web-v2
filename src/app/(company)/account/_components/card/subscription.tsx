'use client';

import {
  CalendarDaysIcon,
  CalendarRangeIcon,
  CreditCardIcon,
  SaveIcon,
  DollarSignIcon,
} from 'lucide-react';
import { useState } from 'react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  useRetrieveSubscriptionMutation,
  useCancelSubscriptionMutation,
} from '@/app/(company)/account/_lib/slice';

import { toast } from 'sonner';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { LoginError } from '@/app/(auth)/login/_lib/slice';
const SwitchDualToggleLabelDemo = () => {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="inline-flex relative rounded-full bg-muted p-1 w-max">
      <div
        className={`absolute top-0 left-0 h-full w-1/2 rounded-full bg-background shadow-sm transition-transform duration-300 ${
          billing === 'annual' ? 'translate-x-full' : ''
        }`}
      />

      <button
        className={`relative z-10 w-24 flex items-center justify-center px-4 py-1.5 text-sm font-medium transition-colors ${
          billing === 'monthly' ? 'text-foreground' : 'text-muted-foreground'
        }`}
        onClick={() => setBilling('monthly')}
      >
        Monthly
      </button>

      <button
        className={`relative z-10 w-24 flex items-center justify-center px-4 py-1.5 text-sm font-medium transition-colors ${
          billing === 'annual' ? 'text-foreground' : 'text-muted-foreground'
        }`}
        onClick={() => setBilling('annual')}
      >
        Annual
      </button>
    </div>
  );
};

const Subscription = () => {
  const [
    retrieveSubscription,
    {
      data: retrieveSubscriptionData,
      isLoading: isRetrieveSubscriptionLoading,
      isSuccess: isRetrieveSubscriptionSuccess,
    },
  ] = useRetrieveSubscriptionMutation();
  const [
    cancelSubscription,
    {
      data: cancelSubscriptionData,
      isLoading: isCancelSubscriptionLoading,
      isSuccess: isCancelSubscriptionSuccess,
    },
  ] = useCancelSubscriptionMutation();
  const handleCancelSubscriptionSubmit = (): void => {
    console.log('abdullah');
    cancelSubscription({});
  };

  React.useEffect(() => {
    try {
      retrieveSubscription({}).unwrap();
    } catch (err) {
      toast.error('Retrieve Current User Failed', {
        description:
          ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
          'Something went wrong. Please try again later.',
      });
    }
  }, [retrieveSubscription]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className={'text-xl'}>Subscription</CardTitle>
        <CardDescription>
          View and manage your subscription plan and payment details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground leading-none text-transform: capitalize">
              {retrieveSubscriptionData?.plan} Plan
            </span>
            <span className="inline-flex items-center justify-center h-5 px-2 rounded-full bg-green-500/10 text-green-600 text-xs font-medium leading-none text-transform: capitalize">
              {retrieveSubscriptionData?.status}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDaysIcon className="h-4 w-4" />
            <span>Start Date</span>
          </div>
          <span className="text-base">
            {new Date(retrieveSubscriptionData?.start_date * 1000).toDateString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarRangeIcon className="h-4 w-4" />
            <span>End Date</span>
          </div>
          <span className="text-base">
            {new Date(retrieveSubscriptionData?.end_date * 1000).toDateString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CreditCardIcon className="h-4 w-4" />
            <span>Next Billing Date</span>
          </div>
          <span className="text-base">
            {retrieveSubscriptionData?.next_billing_date
              ? new Date(retrieveSubscriptionData.next_billing_date * 1000).toDateString()
              : ''}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSignIcon className="h-4 w-4" />
            <span>Amount</span>
          </div>
          <span className="text-base">100 USD / month</span>
        </div>
      </CardContent>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <SwitchDualToggleLabelDemo />
        </div>

        <RadioGroup className="flex gap-4 w-full" defaultValue="card-1">
          <div className="relative flex-1 flex cursor-pointer items-start space-x-3 rounded-lg border border-muted bg-background p-5 shadow-sm transition-all hover:border-primary hover:bg-accent/50 focus-within:ring-2 focus-within:ring-primary">
            <RadioGroupItem id="card-1" value="card-1" className="mt-1" />
            <div className="grid gap-1 leading-none">
              <Label className="cursor-pointer font-medium text-base" htmlFor="card-1">
                Standard Plan
              </Label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">$49</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Perfect for individuals and small business teams.
              </p>
            </div>
          </div>

          <div className="relative flex-1 flex cursor-pointer items-start space-x-3 rounded-lg border border-muted bg-background p-5 shadow-sm transition-all hover:border-primary hover:bg-accent/50 focus-within:ring-2 focus-within:ring-primary">
            <RadioGroupItem id="card-2" value="card-2" className="mt-1" />
            <div className="grid gap-1 leading-none">
              <Label className="cursor-pointer font-medium text-base" htmlFor="card-2">
                Premium Plan
              </Label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">$79</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Advanced features for growing business teams.
              </p>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="h-fit w-full space-x-4">
        <Button className="h-fit">
          <SaveIcon />
          <span>Select Plan</span>
        </Button>
        <Button variant="destructive" className="h-fit" onClick={handleCancelSubscriptionSubmit}>
          <SaveIcon />
          <span>Cancel Subscription</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Subscription;
