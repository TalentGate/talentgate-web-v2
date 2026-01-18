'use client';

import { useState } from 'react';

import CreateJobBreadcrumb from './_components/breadcrumb/breadcrumb';
import CtaGroup from './_components/section/cta-group';
import JobDetailsForm from './_components/form/job-details-form';
import AddObserversForm from './_components/form/add-observers-form';
import PublishJobForm from './_components/form/publish-job-form';
import Header from './_components/section/header';
import {
  CreateCompanyJobRequest,
  useCreateCompanyJobMutation,
} from '@/app/(company)/jobs/_lib/slice';
import { toast } from 'sonner';
import JobLocationForm from '@/app/(company)/jobs/create-job/_components/form/job-location-form';
import JobSalaryForm from '@/app/(company)/jobs/create-job/_components/form/job-salary-form';

import { useRouter } from 'next/navigation';

const breadcrumbItems = [
  {
    step: 1,
    label: 'Step 1: Job Details',
  },
  {
    step: 2,
    label: 'Step 2: Job Location',
  },
  {
    step: 3,
    label: 'Step 3: Job Salary',
  },
  {
    step: 4,
    label: 'Step 4: Pipeline Observers',
  },
  {
    step: 5,
    label: 'Step 5: Publish Job Post',
  },
];

const CreateJobPage = () => {
  const [formPage, setFormPage] = useState<number>(1);
  const router = useRouter();
  const [
    createCompanyJob,
    {
      data: createCompanyJobData,
      isLoading: createCompanyJobIsLoading,
      isError: createCompanyJobIsError,
    },
  ] = useCreateCompanyJobMutation();
  const [formData, setFormData] = useState<CreateCompanyJobRequest>({
    title: '',
    description: '',
    department: '',
    employment_type: '',
    job_post_deadline: '',
    company_id: 1,
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

  const handleNext = () => {
    setFormPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setFormPage((prev) => prev - 1);
  };
  const handleSubmit = async () => {
    try {
      const requestBody: CreateCompanyJobRequest = {
        title: formData.title,
        description: formData.description,
        department: formData.department,
        employment_type: formData.employment_type,
        job_post_deadline:
          formData.job_post_deadline ||
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        company_id: 1,
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
      await createCompanyJob(requestBody).unwrap();
      toast.success('Job created successfully!');
    } catch (error) {
      toast.error('Failed to create job');
      console.error(error);
    }
  };

  return (
    <main className="p-6 h-full w-full flex flex-col gap-8">
      <Header formPage={formPage} />

      <CreateJobBreadcrumb
        formPage={formPage}
        setFormPage={setFormPage}
        breadcrumbItems={breadcrumbItems}
      />

      {formPage === 1 && <JobDetailsForm formData={formData} setFormData={setFormData} />}
      {formPage === 2 && <JobLocationForm formData={formData} setFormData={setFormData} />}
      {formPage === 3 && <JobSalaryForm formData={formData} setFormData={setFormData} />}
      {formPage === 4 && <AddObserversForm />}
      {formPage === 5 && <PublishJobForm />}

      <CtaGroup
        onSubmit={handleSubmit}
        formPage={formPage}
        setFormPage={setFormPage}
        isLastStep={formPage === breadcrumbItems.length}
      />
    </main>
  );
};

export default CreateJobPage;
