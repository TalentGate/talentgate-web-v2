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
import JobDetailsForm from '@/app/(company)/jobs/[job_id]/edit-job/_components/form/job-details-form';
import { CreateCompanyJobRequest } from '@/app/(company)/jobs/_lib/slice';

type JobDetailsCardProps = {
  formData?: any;
  setFormData?: (x: CreateCompanyJobRequest) => void;
};

const JobDetailsCard = ({ formData, setFormData }: JobDetailsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
      </CardHeader>

      <CardContent>
        <JobDetailsForm formData={formData} setFormData={setFormData} />
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

export default JobDetailsCard;
