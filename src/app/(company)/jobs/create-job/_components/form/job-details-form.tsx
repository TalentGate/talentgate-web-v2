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
import { CreateCompanyJobRequest } from '@/app/(company)/jobs/_lib/slice';

type JobDetailsFormProps = {
  formData?: any;
  setFormData?: (x: CreateCompanyJobRequest) => void;
}

const JobDetailsForm = ({ formData, setFormData }: JobDetailsFormProps) => {
  const onChange = (field: string, value: any) => {
    if (setFormData) {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  return (
    <section className="grid items-start gap-6">
      <div className="grid gap-2">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input defaultValue={formData.title || undefined} type="text" id="jobTitle" placeholder="Job Title"
               onChange={(e) => {
                 onChange('title', e.target.value);
               }} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="jobDescription">Job Description</Label>
        <Textarea defaultValue={formData.description || undefined} id="jobDescription" placeholder="Job Description"
                  onChange={(e) => {
                    onChange('description', e.target.value);
                  }} />
      </div>

      <div className="grid gap-2">
        <Select onValueChange={(e) => {
          onChange('department', e);
        }} defaultValue={formData.department || undefined}>
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
        <Label htmlFor="employmentType">Employment Type</Label>
        <RadioGroup defaultValue={formData.employment_type || 'Full-Time'} className="space-y-1 lg:flex lg:gap-6"
                    onValueChange={(e) => {
                      onChange('employment_type', e);
                    }}>
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
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Contractor" id="Contractor" />
            <Label htmlFor="Contractor">Contractor</Label>
          </div>
        </RadioGroup>
      </div>
    </section>
  );
};

export default JobDetailsForm;
