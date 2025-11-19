'use client';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  CalendarDaysIcon,
  CalendarRangeIcon,
  CreditCardIcon,
  SaveIcon,
  DollarSignIcon,
} from 'lucide-react';
import { useState } from 'react';
import * as React from 'react';
import { toast } from 'sonner';

import { LoginError } from '@/app/(auth)/login/_lib/slice';
import {
  useRetrieveSubscriptionMutation,
  useRetrieveProductsMutation,
  useCancelSubscriptionMutation,
  RetrieveProductResponse,
} from '@/app/(company)/account/_lib/slice';
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
import { usePaddle } from '@/hooks/use-paddle';

const Subscription = () => {
  const [billingCycle, setBillingCycle] = useState<string>('month');
  const [subscriptionPlan, setSubscriptionPlan] = useState<string>('standard');

  const items = [
    { quantity: 1, priceId: 'pri_01k9wxqvh4q97cbyp9hns06da4' },
    // { quantity: 1, priceId: 'pri_01k9mgyxdqj8ym2ey7wtge5ja0' },
    // { quantity: 1, priceId: 'pri_01k9n20hkm645z3m2mbwzqwya3' },
    // { quantity: 1, priceId: 'pri_01k9n226yxc9jaq5n1r4dcvabg' },
  ];

  const paddle = usePaddle();

  const handleCheckout = () => {
    paddle!.Checkout.open({
      items: items,
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
      },
    });
  };

  const [
    retrieveSubscription,
    {
      data: retrieveSubscriptionData,
      isLoading: isRetrieveSubscriptionLoading,
      isSuccess: isRetrieveSubscriptionSuccess,
    },
  ] = useRetrieveSubscriptionMutation();
  const [
    retrieveProducts,
    {
      data: retrieveProductsData,
      isLoading: isRetrieveProductsLoading,
      isSuccess: isRetrieveProductsSuccess,
    },
  ] = useRetrieveProductsMutation();
  const [
    cancelSubscription,
    {
      data: cancelSubscriptionData,
      isLoading: isCancelSubscriptionLoading,
      isSuccess: isCancelSubscriptionSuccess,
    },
  ] = useCancelSubscriptionMutation();
  const handleCancelSubscriptionSubmit = (): void => {
    cancelSubscription({});
  };

  React.useEffect(() => {
    try {
      retrieveSubscription({}).unwrap();
    } catch (err) {
      toast.error('Retrieve Subscription Failed', {
        description:
          ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
          'Something went wrong. Please try again later.',
      });
    }
  }, [retrieveSubscription]);

  React.useEffect(() => {
    try {
      retrieveProducts({}).unwrap();
    } catch (err) {
      toast.error('Retrieve Products Failed', {
        description:
          ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
          'Something went wrong. Please try again later.',
      });
    }
  }, [retrieveProducts]);

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
              {retrieveSubscriptionData?.plan ? `${retrieveSubscriptionData.plan} Plan` : ''}
            </span>
            {retrieveSubscriptionData?.status === 'active' ? (
              <span className="inline-flex items-center justify-center h-5 px-2 rounded-full bg-green-500/10 text-green-600 text-xs font-medium leading-none text-transform: capitalize">
                {retrieveSubscriptionData.status}
              </span>
            ) : retrieveSubscriptionData?.status === 'expired' ? (
              <span className="inline-flex items-center justify-center h-5 px-2 rounded-full bg-red-500/10 text-red-600 text-xs font-medium leading-none text-transform: capitalize">
                {retrieveSubscriptionData.status}
              </span>
            ) : (
              <span className="inline-flex items-center justify-center h-5 px-2 rounded-full bg-white-500/10 text-white-600 text-xs font-medium leading-none text-transform: capitalize">
                {''}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDaysIcon className="h-4 w-4" />
            <span>Start Date</span>
          </div>
          <span className="text-base">
            {retrieveSubscriptionData?.start_date
              ? new Date(retrieveSubscriptionData.start_date * 1000).toDateString()
              : ''}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarRangeIcon className="h-4 w-4" />
            <span>End Date</span>
          </div>
          <span className="text-base">
            {retrieveSubscriptionData?.end_date
              ? new Date(retrieveSubscriptionData.end_date * 1000).toDateString()
              : ''}
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
          <span className="text-base">
            {retrieveSubscriptionData?.amount ? retrieveSubscriptionData.amount : ''}
          </span>
        </div>
      </CardContent>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="inline-flex relative rounded-full bg-muted p-1 w-max">
            <div
              className={`absolute top-0 left-0 h-full w-1/2 rounded-full bg-background shadow-sm transition-transform duration-300 ${
                billingCycle === 'year' ? 'translate-x-full' : ''
              }`}
            />

            <button
              className={`relative z-10 w-24 flex items-center justify-center px-4 py-1.5 text-sm font-medium transition-colors ${
                billingCycle === 'month' ? 'text-foreground' : 'text-muted-foreground'
              }`}
              onClick={() => setBillingCycle('month')}
            >
              Monthly
            </button>

            <button
              className={`relative z-10 w-24 flex items-center justify-center px-4 py-1.5 text-sm font-medium transition-colors ${
                billingCycle === 'year' ? 'text-foreground' : 'text-muted-foreground'
              }`}
              onClick={() => setBillingCycle('year')}
            >
              Annually
            </button>
          </div>
        </div>
        <RadioGroup
          className="flex gap-4 w-full"
          value={subscriptionPlan}
          onValueChange={(v) => setSubscriptionPlan(v as string)}
        >
          {retrieveProductsData?.map((product: RetrieveProductResponse) => {
            const id = product.name;

            return (
              <label
                key={id}
                htmlFor={id}
                className={`
          relative flex-1 cursor-pointer items-center rounded-lg border
          border-muted bg-background p-5 shadow-sm transition-all
          hover:border-primary hover:bg-accent/50 hover:shadow-md
          focus-within:ring-2 focus-within:ring-primary
          data-[state=checked]:border-primary data-[state=checked]:bg-accent/50
        `}
              >
                <div className="flex items-center space-x-4">
                  <RadioGroupItem
                    id={id}
                    value={id}
                    className="w-5 h-5 border-1 rounded-full checked:bg-primary checked:border-primary transition-all mb-4 flex-shrink-0"
                  />

                  <div className="grid gap-1 leading-none">
                    <span className="font-medium text-base inline-block first-letter:uppercase">
                      {product.name} Plan
                    </span>

                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-foreground">
                        {
                          product.prices?.find((price) => price?.billing_cycle === billingCycle)
                            ?.unit_price.amount
                        }
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /
                        {
                          product.prices?.find((price) => price?.billing_cycle === billingCycle)
                            ?.billing_cycle
                        }
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm">{product.description}</p>
                  </div>
                </div>
              </label>
            );
          })}
        </RadioGroup>
      </CardContent>
      <CardFooter className="h-fit w-full space-x-4">
        <Button className="h-fit" onClick={handleCheckout}>
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
