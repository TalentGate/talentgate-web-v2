'use client';

import { useState } from 'react';

import CreateJobBreadcrumb from './_components/breadcrumb/breadcrumb';
import CtaGroup from './_components/section/cta-group';
import FormPage1 from './_components/section/form-page-1';
import FormPage2 from './_components/section/form-page-2';
import FormPage3 from './_components/section/form-page-3';
import FormPage4 from './_components/section/form-page-4';
import Header from './_components/section/header';

const mockAddJobFormStep = [
  'CV?',
  'Name?',
  'Surname?',
  'Email?',
  'Phone?',
  'Location?',
  'City?',
  'Country?',
  'Linkedin URL?',
  'Personal Portfolio?',
  'Cover Letter',
  'CV?',
  'Name?',
  'Surname?',
  'Email?',
  'Phone?',
  'Location?',
  'City?',
  'Country?',
  'Linkedin URL?',
  'Personal Portfolio?',
  'Cover Letter',
];

const mockAddObserversFormStep = [
  'Name Surname 1',
  'Name Surname 2',
  'Name Surname 3',
  'Name Surname 4',
  'Name Surname 5',
  'Name Surname 6',
  'Name Surname 7',
  'Name Surname 8',
  'Name Surname 9',
  'Name Surname 10',
];

const CreateJobPage = () => {
  const [formPage, setFormPage] = useState<number>(1);

  return (
    <main className="p-6 h-full w-full flex flex-col gap-8">
      <Header formPage={formPage} />

      <CreateJobBreadcrumb formPage={formPage} setFormPage={setFormPage} />

      {formPage === 1 && <FormPage1 />}
      {formPage === 2 && <FormPage2 mockAddJobFormStep={mockAddJobFormStep} />}
      {formPage === 3 && <FormPage3 mockAddObserversFormStep={mockAddObserversFormStep} />}
      {formPage === 4 && <FormPage4 />}

      <CtaGroup formPage={formPage} setFormPage={setFormPage} />
    </main>
  );
};

export default CreateJobPage;
