'use client';

import JobDetailsCard from './_components/card/job-details-card';
import PipelineObserversCard from './_components/card/pipeline-observers-card';
import PublishJobPostCard from './_components/card/publish-job-post-card';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  UpdateCompanyJobRequest,
  useRetrieveCompanyJobQuery,
  useUpdateCompanyJobMutation,
} from '@/app/(company)/jobs/_lib/slice';
import { toast } from 'sonner';
import JobLocationCard from '@/app/(company)/jobs/[job_id]/edit-job/_components/card/job-location-card';
import JobSalaryCard from '@/app/(company)/jobs/[job_id]/edit-job/_components/card/job-salary-card';
import Header from '@/components/section/header';
import { Spinner } from '@/components/ui/spinner';

const EditJob = ({ params }: { params: Promise<{ job_id: string }> }) => {
  const router = useRouter();
  const { job_id } = use(params);

  const {
    data: retrieveCompanyJobData,
    isLoading: retrieveCompanyJobIsLoading,
    error: retrieveCompanyJobError,
  } = useRetrieveCompanyJobQuery({ job_id: Number(job_id), company_id: 1 }); // TODO: Replace with actual company_id
  const [
    updateCompanyJob,
    {
      data: updateCompanyJobData,
      isLoading: updateCompanyJobIsLoading,
      isError: updateCompanyJobIsError,
    },
  ] = useUpdateCompanyJobMutation();

  const [formData, setFormData] = useState<UpdateCompanyJobRequest>({
    title: '',
    description: '',
    department: '',
    employment_type: '',
    job_post_deadline: '',
    location: {
      address: {
        unit: '',
        street: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
      },
      type: '',
      latitude: 0,
      longitude: 0,
    },
    salary: {
      min: 0,
      max: 0,
      frequency: '',
    },
  });

  useEffect(() => {
    if (retrieveCompanyJobData) {
      setFormData({
        title: retrieveCompanyJobData.title,
        description: retrieveCompanyJobData.description,
        department: retrieveCompanyJobData.department,
        employment_type: retrieveCompanyJobData.employment_type,
        job_post_deadline: retrieveCompanyJobData.job_post_deadline,
        location: {
          address: {
            unit: retrieveCompanyJobData.location.unit,
            street: retrieveCompanyJobData.location.street,
            city: retrieveCompanyJobData.location.city,
            state: retrieveCompanyJobData.location.state,
            country: retrieveCompanyJobData.location.country,
            postal_code: retrieveCompanyJobData.location.postal_code,
          },
          type: '',
          latitude: 0,
          longitude: 0,
        },
        salary: {
          min: 0,
          max: 0,
          frequency: '',
        },
      });
    }
  }, [retrieveCompanyJobData]);

  const handleSubmit = async () => {
    try {
      const requestBody: UpdateCompanyJobRequest = {
        title: formData.title,
        description: formData.description,
        department: formData.department,
        employment_type: formData.employment_type,
        job_post_deadline:
          formData.job_post_deadline ||
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        location: {
          address: {
            unit: formData.location.address.unit,
            street: formData.location.address.street,
            city: formData.location.address.city,
            state: formData.location.address.state,
            country: formData.location.address.country,
            postal_code: formData.location.address.postal_code,
          },
          type: formData.location.type,
          latitude: formData.location.latitude,
          longitude: formData.location.longitude,
        },
        salary: {
          min: formData.salary.min,
          max: formData.salary.max,
          frequency: formData.salary.frequency || 'yearly',
        },
      };

      console.log('requestBody', requestBody);
      router.push('/jobs');
      await updateCompanyJob({ id: 1, body: requestBody }).unwrap();
      toast.success('Job updated successfully!');
    } catch (error) {
      toast.error('Failed to update the job');
      console.error(error);
    }
  };

  if (retrieveCompanyJobIsLoading) {
    return <Spinner className="size-10 h-full mx-auto col-span-2" />;
  }

  if (retrieveCompanyJobError) {
    toast.error('Failed loading the job.', { description: retrieveCompanyJobError.toString() });

    return <div>Error loading job data.</div>;
  }

  return (
    <main className="space-y-6 p-6 w-full h-full">
      <Header
        header={`Edit Job ${job_id}`}
        description={"You can edit the selected job's details from this page."}
      />
      <JobDetailsCard formData={formData} setFormData={setFormData} />
      <JobLocationCard formData={formData} setFormData={setFormData} />
      <JobSalaryCard formData={formData} setFormData={setFormData} />
      <PipelineObserversCard />
      <PublishJobPostCard />
    </main>
  );
};

export default EditJob;
