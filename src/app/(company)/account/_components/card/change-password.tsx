import { KeyRoundIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ChangePassword = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Old Password</Label>
          <Input placeholder="Old Password" type="password" />
        </div>

        <div className="space-y-2">
          <Label>New Password</Label>
          <Input placeholder="New Password" type="password" />
        </div>

        <div className="space-y-2">
          <Label>Confirm Password</Label>
          <Input placeholder="Confirm Password" type="password" />
        </div>
      </CardContent>
      <CardFooter className="h-fit w-full space-x-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-fit">
              <KeyRoundIcon />
              <span>Change Password</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              You are about to change your password. If you are not sure about doing this, please
              cancel.
            </DialogDescription>
            <DialogFooter>
              <Button>Change Password</Button>
              <DialogClose asChild>
                <Button variant={'ghost'}>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ChangePassword;
