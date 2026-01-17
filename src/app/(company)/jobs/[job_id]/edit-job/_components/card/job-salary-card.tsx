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
import { CreateCompanyJobRequest } from '@/app/(company)/jobs/_lib/slice';
import JobSalaryForm from '@/app/(company)/jobs/[job_id]/edit-job/_components/form/job-salary-form';

type JobSalaryCardProps = {
  formData?: any;
  setFormData?: (x: CreateCompanyJobRequest) => void;
};

const JobSalaryCard = ({ formData, setFormData }: JobSalaryCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Salary</CardTitle>
      </CardHeader>

      <CardContent>
        <JobSalaryForm formData={formData} setFormData={setFormData} />
      </CardContent>

      <CardFooter>
        <Button className="mt-4">
          <SaveIcon />
          <span>Save Changes</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobSalaryCard;
