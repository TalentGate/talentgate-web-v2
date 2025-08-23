import { SaveIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface ApplicationFormProps {
  mockAddJobFormStep: string[];
}

const ApplicationForm = ({ mockAddJobFormStep }: ApplicationFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Form</CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea className="p-4 border rounded-md">
          <div className="grid gap-2 max-h-[50dvh]">
            {mockAddJobFormStep.map((item, i) => (
              <div
                className="py-1 px-2 border rounded-md flex justify-between items-center"
                key={i}
              >
                <div className="flex items-center gap-1 py-1">
                  <span>{item}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox className="size-5" />
                  <p>Required?</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter>
        <Button>
          <SaveIcon />
          <span>Save Changes</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApplicationForm;
