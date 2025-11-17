'use client';

import { useState } from 'react';

import Header from '@/components/section/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import CurrentPlan from './_components/card/current-plan';

const BillingAndSubscription = () => {
  return (
    <main className="p-6 space-y-6 h-full w-full">
      <Header
        header="Billing and Subscription"
        description="Manage billing and subscription details."
      />
      <CurrentPlan />
    </main>
  );
};

export default BillingAndSubscription;
