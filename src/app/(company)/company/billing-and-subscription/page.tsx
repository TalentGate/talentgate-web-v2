'use client';

import { useState } from 'react';

import Header from '@/components/section/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import BillingHistory from './_components/card/billing-history';
import CurrentPlan from './_components/card/current-plan';
import QuickStats from './_components/card/quick-stats';
import RecentInvoices from './_components/card/recent-invoices';
import PlanPricing from './_components/section/plan-pricing';

const BillingAndSubscription = () => {
  const [currentTab, setCurrentTab] = useState('overview');

  return (
    <main className="p-6 space-y-6 h-full w-full">
      <Header
        header="Billing and Subscription"
        description="Manage billing and subscription details."
      />

      <Tabs className="w-full" value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans-and-pricing">Plans and Pricing</TabsTrigger>
          <TabsTrigger value="billing-history">Billing History</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <section className="grid grid-cols-1 gap-6">
            <CurrentPlan />
            <QuickStats />
          </section>
        </TabsContent>
        <TabsContent value="plans-and-pricing">
          <PlanPricing />
        </TabsContent>
        <TabsContent value="billing-history">
          <BillingHistory />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default BillingAndSubscription;
