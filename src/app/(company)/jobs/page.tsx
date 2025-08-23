'use client';

import Link from 'next/link';

import { PlusIcon } from 'lucide-react';

import Header from '@/components/section/header';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import JobItem from './_components/card/job_item';
import SearchField from './_components/input/search-field';
import DepartmentFilter from './_components/select/department_filter';
import JobTypeFilter from './_components/select/job_type_filter';
import LocationFilter from './_components/select/location_filter';
import LocationTypeFilter from './_components/select/location_type_filter';

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  location_type: string;
  department: string;
  type: string;
  salary_range: string;
  total_applicants: number;
  postedAt: string;
  description: string;
};

const jobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Corp',
    location: 'Remote',
    location_type: 'Remote',
    department: 'Engineering',
    type: 'Full-time',
    salary_range: '$120k - $150k',
    total_applicants: 25,
    postedAt: 'May 9, 2025',
    description: 'We’re looking for a React developer with experience in Next.js and Tailwind CSS.',
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'API Solutions',
    location: 'New York, NY',
    location_type: 'On-Site',
    department: 'Engineering',
    type: 'Part-time',
    salary_range: '$120k - $150k',
    total_applicants: 25,
    postedAt: 'May 7, 2025',
    description: 'Join our backend team to work on scalable APIs using Node.js and PostgreSQL.',
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'API Solutions',
    location: 'New York, NY',
    location_type: 'Hybrid',
    department: 'Engineering',
    type: 'Internship',
    salary_range: '$120k - $150k',
    total_applicants: 25,
    postedAt: 'May 7, 2025',
    description: 'Join our backend team to work on scalable APIs using Node.js and PostgreSQL.',
  },
];

export default function Jobs() {
  return (
    <main className="p-6 space-y-6 h-full w-full">
      {/* HEADER AND CREATE JOB BUTTON */}
      <section className="flex justify-between">
        <Header header="Jobs" description="Manage open positions and track applications." />

        <Button asChild>
          <Link href="/jobs/create-job">
            <PlusIcon />
            <span>Create job</span>
          </Link>
        </Button>
      </section>

      {/* SEARCH AND FILTERS */}
      <section className="flex w-full gap-4 flex-wrap">
        <SearchField />
        <DepartmentFilter />
        <JobTypeFilter />
        <LocationFilter />
        <LocationTypeFilter />
      </section>

      {/* JOBS GRID */}
      <section className="grid md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </section>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
