import { RotateCcwIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
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

const ResetPassword = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Employee Password</CardTitle>
        <CardDescription>
          From this section you can trigger a reset password action for the selected employee. If
          selected, a reset password link will be sent to the employee's email address.
        </CardDescription>
      </CardHeader>

      <CardFooter className="h-fit w-full space-x-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-fit">
              <RotateCcwIcon />
              <span>Reset Password</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              You are about to reset the employee's password. Are you sure you want to proceed with
              this action?
            </DialogDescription>
            <DialogFooter>
              <Button>Reset Password</Button>
              <DialogClose asChild>
                <Button variant={'ghost'}>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant={'outline'} className="h-full">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResetPassword;
