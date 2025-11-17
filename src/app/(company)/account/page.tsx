import * as React from 'react';

import BillingHistory from '@/app/(company)/account/_components/card/billing-history';
import Subscription from '@/app/(company)/account/_components/card/subscription';
import Header from '@/components/section/header';

import Profile from './_components/card/profile';

const Account = () => {
  return (
    <main className="p-6 space-y-6 h-full w-full">
      <Header header="Account" description="See a complete timeline of your billing activity" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Profile />
        <Subscription />
        <div className="md:col-span-2">
          <BillingHistory />
        </div>
      </div>
    </main>
  );
};

export default Account;
