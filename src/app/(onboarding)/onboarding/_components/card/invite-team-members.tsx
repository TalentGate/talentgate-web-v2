'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Trash, User } from 'lucide-react';
import { useState } from 'react';

function InviteTeamMembers({
  increaseStep,
  decreaseStep,
}: {
  increaseStep: () => void;
  decreaseStep: () => void;
}) {
  const [inviteEmailField, setInviteEmailField] = useState<string>('');
  const [invitedTeamMembers, setInvitedTeamMembers] = useState<string[]>([
    'cerrahoglu.erim@gmail.com',
    'abdullah.deliogullari@yaani.com',
  ]);

  const handleInviteEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmailField(e.target.value);
  };

  const addNewMember = (email: string) => {
    setInvitedTeamMembers([...invitedTeamMembers, email]);
  };

  const removeMember = (email: string) => {
    setInvitedTeamMembers(invitedTeamMembers.filter((member) => member !== email));
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Invite Team Members</CardTitle>
        <CardDescription>
          We'll send invitation emails once the onboarding is completed. Our free plan allows up to
          3 members. You can add more by upgrading your plan later.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Invite Email</Label>
            <Input
              placeholder="Enter email address of team member"
              type="email"
              onChange={handleInviteEmailChange}
            />
          </div>

          <Button onClick={() => addNewMember(inviteEmailField)}>Add Member</Button>
        </div>

        <div className="space-y-2">
          <Label>Invited Team Members</Label>
          <div className="flex flex-col gap-2">
            {invitedTeamMembers.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 p-2 border rounded-md"
              >
                <div className="flex items-center gap-2">
                  <User />
                  <span>{member}</span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeMember(member)}
                  aria-label="Remove Member"
                >
                  <Trash />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-between">
        <Button onClick={decreaseStep} variant="outline">
          <ArrowLeft />
          <span>Previous Step</span>
        </Button>

        <Button onClick={increaseStep}>
          <span>Next Step</span>
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default InviteTeamMembers;
