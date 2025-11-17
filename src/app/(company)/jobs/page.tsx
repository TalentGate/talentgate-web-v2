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
import DepartmentFilter from './_components/dropdown/department_filter';
import EmploymentTypeFilter from './_components/dropdown/employment_type_filter';
import LocationTypeFilter from './_components/dropdown/location_type_filter';
import TitleSearchFilter from '@/app/(company)/jobs/_components/field/title_search_filter';
import { Spinner } from '@/components/ui/spinner';
import { useRetrieveCompanyJobsQuery } from '@/app/(company)/jobs/_lib/slice';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Jobs() {
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [locationTypes, setLocationTypes] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const { data, isLoading, error } = useRetrieveCompanyJobsQuery({
    company_id: 1,
    title: title,
    employment_type: employmentTypes,
    location_type: locationTypes,
    departments: departments,
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
      <section className="grid grid-cols-4 gap-4">
        <TitleSearchFilter setTitle={setTitle} />
        <EmploymentTypeFilter value={employmentTypes || []} onChange={setEmploymentTypes} />
        <DepartmentFilter value={departments || []} onChange={setDepartments} />
        <LocationTypeFilter value={locationTypes || []} onChange={setLocationTypes} />
      </section>

      {/* JOBS GRID */}
      <section className="grid md:grid-cols-2 gap-4">
        {data && data.map((job) => <JobItem key={job.id} job={job} />)}
        {isLoading && <Spinner className={'size-10 h-full mx-auto col-span-2'} />}
        {error && <p>Error loading jobs.</p>}
      </section>

      {/*PAGINATION AND LIMIT*/}
      <section className={'flex mt-4'}>
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
      </section>
    </main>
  );
}
