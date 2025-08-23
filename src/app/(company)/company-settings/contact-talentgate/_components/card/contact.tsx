import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input placeholder="Title" />
        </div>
        <div className="space-y-2">
          <Label>Content</Label>
          <Textarea placeholder="Content" className="min-h-[160px]" />
        </div>
      </CardContent>

      <CardFooter className="gap-4">
        <Button>
          <Send />
          <span>Submit</span>
        </Button>

        <Button variant={'outline'} className="h-full">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Contact;
