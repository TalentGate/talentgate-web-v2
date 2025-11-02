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
import EmploymentTypeFilter from './_components/select/employment_type_filter';
import LocationFilter from './_components/select/location_filter';
import LocationTypeFilter from './_components/select/location_type_filter';
import { useRetrieveCompanyJobsQuery } from '@/app/(company)/jobs/_lib/slice';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

export default function Jobs() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, error } = useRetrieveCompanyJobsQuery({
    offset: offset.toString(),
    limit: limit.toString(),
  });

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
        <EmploymentTypeFilter />
        <LocationFilter />
        <LocationTypeFilter />
      </section>

      {/* JOBS GRID */}
      <section className="grid md:grid-cols-2 gap-4">
        {data !== undefined && data.map((job) => <JobItem key={job.id} job={job} />)}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading jobs.</p>}
      </section>

      <div className={'flex mt-4'}>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  setOffset((prev) => Math.max(0, prev - limit));
                }}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
                {Math.floor(offset / limit) + 1}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  if (!data || data.length < limit) return;
                  setOffset((prev) => prev + limit);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <Select defaultValue="10" onValueChange={(v) => setLimit(Number(v))}>
          <SelectTrigger>
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </main>
  );
}
