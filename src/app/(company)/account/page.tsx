import * as React from 'react';

import Header from '@/components/section/header';

import AccountInformation from './_components/card/account-information';

const Account = () => {
  return (
    <main className="p-6 space-y-6 h-full w-full">
      <Header header="Account" description="You can modify your account information" />
      <AccountInformation />
    </main>
  );
};

export default Account;
