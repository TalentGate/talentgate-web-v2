import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateCompanyJobRequest } from '@/app/(company)/jobs/_lib/slice';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type JobSalaryFormProps = {
  formData?: any;
  setFormData?: (x: CreateCompanyJobRequest) => void;
};

const JobSalaryForm = ({ formData, setFormData }: JobSalaryFormProps) => {
  const onChange = (field: string, value: any) => {
    if (setFormData) {
      setFormData({
        ...formData,
        salary: {
          ...formData.salary,
          [field]: value,
        },
      });
    }
  };

  return (
    <section className="grid items-start gap-6">
      <div className="grid gap-2">
        <Label htmlFor="jobSalaryMin">Minimum Salary</Label>
        <Input
          defaultValue={formData.salary.min || undefined}
          type="text"
          id="jobSalaryMin"
          placeholder="Minimum Salary"
          onChange={(e) => {
            onChange('min', e.target.value);
          }}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="jobSalaryMax">Maximum Salary</Label>
        <Input
          defaultValue={formData.salary.max || undefined}
          type="text"
          id="jobSalaryMax"
          placeholder="Maximum Salary"
          onChange={(e) => {
            onChange('max', e.target.value);
          }}
        />
      </div>

      <div className="grid gap-2">
        <Select
          onValueChange={(e) => {
            onChange('frequency', e);
          }}
          defaultValue={formData.salary.frequency || undefined}
        >
          <Label htmlFor="jobSalaryFrequency">Salary Payment Frequency</Label>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Salary Payment Frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hourly">Hourly</SelectItem>
            <SelectItem value="Daily">Daily</SelectItem>
            <SelectItem value="Weekly">Weekly</SelectItem>
            <SelectItem value="Monthly">Monthly</SelectItem>
            <SelectItem value="Yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default JobSalaryForm;
