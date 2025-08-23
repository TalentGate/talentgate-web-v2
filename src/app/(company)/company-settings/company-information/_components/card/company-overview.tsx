import { SaveIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const CompanyOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Company Title</Label>
          <Input placeholder="Company Title" />
        </div>

        <div className="space-y-2">
          <Label>Company description</Label>
          <Textarea placeholder="Company description" />
        </div>

        <div className="space-y-2">
          <Label>Company Website Address</Label>
          <Input placeholder="Company Website Address" />
        </div>
      </CardContent>
      <CardFooter className="h-fit w-full space-x-4">
        <Button className="h-fit">
          <SaveIcon />
          <span>Save Changes</span>
        </Button>
        <Button variant={'outline'} className="h-full">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyOverview;
