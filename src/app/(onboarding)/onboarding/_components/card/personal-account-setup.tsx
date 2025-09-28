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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera, ArrowRight } from 'lucide-react';

function PersonalAccountSetup({ increaseStep }: { increaseStep: () => void }) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Personal Profile Setup</CardTitle>
        <CardDescription>Set up your profile to use within TalentGate.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Profile Photo</Label>
          <div className="flex items-center gap-4">
            <Input placeholder="Upload a profile image" className="cursor-pointer" type="file" />
            <Avatar className="size-16">
              <AvatarImage className="size-16" />
              <AvatarFallback>
                <Camera className="stroke-muted-foreground/30 p-1" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input
            placeholder="Enter your email address"
            type="email"
            defaultValue={'deneme@deneme.com'}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label>First Name</Label>
          <Input placeholder="Enter your first name" />
        </div>

        <div className="space-y-2">
          <Label>Last Name</Label>
          <Input placeholder="Enter your last name" />
        </div>

        <div className="space-y-2">
          <Label>Job Title</Label>
          <Input placeholder="Enter your job title" />
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Button onClick={increaseStep}>
          <span>Next Step</span>
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PersonalAccountSetup;
