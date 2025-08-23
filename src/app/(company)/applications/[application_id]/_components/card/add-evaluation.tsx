'use client';

import { Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const AddEvaluation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Evaluation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Comment</Label>
          <Textarea placeholder="Write your comment..." className="h-24" />
        </div>

        <div className="space-y-2">
          <Label>Rating</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Add Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'None'}>
                <span>None</span>
              </SelectItem>
              <SelectItem value={'1'}>
                <Star className="stroke-yellow-400 fill-yellow-400" />
                <span>1</span>
              </SelectItem>
              <SelectItem value={'2'}>
                <Star className="stroke-yellow-400 fill-yellow-400" />
                <span>2</span>
              </SelectItem>
              <SelectItem value={'3'}>
                <Star className="stroke-yellow-400 fill-yellow-400" />
                <span>3</span>
              </SelectItem>
              <SelectItem value={'4'}>
                <Star className="stroke-yellow-400 fill-yellow-400" />
                <span>4</span>
              </SelectItem>
              <SelectItem value={'5'}>
                <Star className="stroke-yellow-400 fill-yellow-400" />
                <span>5</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <CardFooter>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
};

export default AddEvaluation;
