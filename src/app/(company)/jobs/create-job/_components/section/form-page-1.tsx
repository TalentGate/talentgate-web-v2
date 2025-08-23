import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const FormPage1 = () => {
  return (
    <section className="grid items-start gap-6">
      <div className="grid gap-2">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input type="text" id="jobTitle" placeholder="Job Title" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="jobDescription">Job Description</Label>
        <Textarea id="jobDescription" placeholder="Job Description" />
      </div>

      <div className="grid gap-2">
        <Select>
          <Label htmlFor="jobDepartment">Job Department</Label>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Analytics">Analytics</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Select>
          <Label htmlFor="jobLocation">Job Location</Label>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Istanbul, Turkey">Istanbul, Turkey</SelectItem>
            <SelectItem value="Ankara, Turkey">Ankara, Turkey</SelectItem>
            <SelectItem value="Talinn, Estonia">Talinn, Estonia</SelectItem>
            <SelectItem value="EMEA">EMEA</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="jobRemote">Job Type</Label>
        <RadioGroup defaultValue={'Full-Time'} className="space-y-1 lg:flex lg:gap-6">
          <div className="self-end flex items-center space-x-2">
            <RadioGroupItem value="Full-Time" id="Full-Time" />
            <Label htmlFor="Full-Time">Full-Time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Part-Time" id="Part-Time" />
            <Label htmlFor="Part-Time">Part-Time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Internship" id="Internship" />
            <Label htmlFor="Internship">Internship</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="jobRemote">Location Type</Label>
        <RadioGroup defaultValue={'On-Site'} className="space-y-1 lg:flex lg:gap-6">
          <div className="self-end flex items-center space-x-2">
            <RadioGroupItem value="On-Site" id="On-Site" />
            <Label htmlFor="On-Site">On-Site</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Hybrid" id="Hybrid" />
            <Label htmlFor="Hybrid">Hybrid</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Remote" id="Remote" />
            <Label htmlFor="Remote">Remote</Label>
          </div>
        </RadioGroup>
      </div>
    </section>
  );
};

export default FormPage1;
