import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

function CompanyProfile({
  increaseStep,
  decreaseStep,
}: {
  increaseStep: () => void;
  decreaseStep: () => void;
}) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Company Information</CardTitle>
        <CardDescription>Tell us a bit about your company.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Company Name</Label>
          <Input placeholder="Company Name" />
        </div>

        <div className="space-y-2 w-full">
          <Label>Industry</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Company Website URL</Label>
          <Input placeholder="Company Website URL" type="url" />
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

export default CompanyProfile;
