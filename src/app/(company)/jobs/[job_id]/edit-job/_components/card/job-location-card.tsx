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
import JobLocationForm from '@/app/(company)/jobs/[job_id]/edit-job/_components/form/job-location-form';

type JobLocationCardProps = {
  formData?: any;
  setFormData?: (x: CreateCompanyJobRequest) => void;
};

const JobLocationCard = ({ formData, setFormData }: JobLocationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Location</CardTitle>
      </CardHeader>

      <CardContent>
        <JobLocationForm formData={formData} setFormData={setFormData} />
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

export default JobLocationCard;
