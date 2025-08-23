import { SaveIcon } from 'lucide-react';
import * as React from 'react';

import Header from '@/components/section/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import AccountInformation from './_components/card/account-information';
import ChangePassword from './_components/card/change-password';

const MyAccount = () => {
  return (
    <main className="p-6 space-y-6 h-full w-full">
      <Header
        header="Account"
        description="You can modify your account information and change subscription from this page."
      />
      <AccountInformation />
      {/*<ChangePassword />*/}
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Plan: </Label>
                {/*<Input name="firstname" placeholder="Firstname" className="focus-visible:ring-transparent"/>*/}
              </div>

              <div className="space-y-2">
                <Label>Status: </Label>
                {/*<Input name="lastname"placeholder="Lastname" className="focus-visible:ring-transparent"/>*/}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Start date:</Label>
              {/*<Input name="username" placeholder="Username" className="focus-visible:ring-transparent"/>*/}
            </div>

            <div className="space-y-2">
              <Label>End date:</Label>
              {/*<Input name="email" placeholder="Email" className="focus-visible:ring-transparent"/>*/}
            </div>
          </div>
        </CardContent>

        <CardFooter className="h-fit w-full space-x-4">
          <Button className="h-fit">
            <SaveIcon />
            <span>Save Changes</span>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default MyAccount;
