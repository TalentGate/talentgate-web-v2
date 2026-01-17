import Link from 'next/link';

import {
  Briefcase,
  Copy,
  Ellipsis,
  EyeIcon,
  LaptopIcon,
  MapPinIcon,
  NotebookPen,
  SquarePen,
  Trash2,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { RetrieveCompanyJobResponse } from '@/app/(company)/jobs/_lib/slice';
import { formatTimestamp } from '@/lib/utils';

type JobItemProps = {
  job: RetrieveCompanyJobResponse;
  onDeleteJob: (id: number) => void;
};

const JobItem = ({ job, onDeleteJob }: JobItemProps) => {
  job = { ...job, total_applicants: 5 }; // TODO REMOVE WHEN RESPONSE PROPER FIELDS
  job.location = { ...job.location, type: 'On-site', country: 'Turkey', city: 'Istanbul' }; // TODO REMOVE WHEN RESPONSE HAS PROPER LOCATION FIELDS
  job.salary = { min: 5000.0, max: 7000.0, frequency: 'YEARLY' }; // TODO REMOVE WHEN RESPONSE HAS PROPER SALARY FIELDS

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-2 w-full">
            <CardTitle>{job.title}</CardTitle>
            <div className="flex gap-4">
              <CardDescription className="flex gap-1">
                <Briefcase className="size-5" />
                <span>{job.department}</span>
              </CardDescription>

              <CardDescription className="flex gap-1">
                <MapPinIcon className="size-5" />
                {job.location.type === 'REMOTE' ? (
                  <span>{job.location.type}</span>
                ) : (
                  <span>
                    {job.location.city}, {job.location.country}
                  </span>
                )}
              </CardDescription>

              <CardDescription className="flex gap-1">
                <LaptopIcon className="size-5" />
                <span>{job.location.type}</span>
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'ghost'}>
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={`jobs/${job.id}`}>
                  <EyeIcon />
                  <span>View</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`jobs/${job.id}/edit-job`}>
                  <SquarePen />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy />
                <span>Duplicate</span>
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() => onDeleteJob(job.id)}>
                <Trash2 />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <>
          {job.employment_type.toLowerCase() === 'full-time' && (
            <Badge variant={'full_time'}>{job.employment_type}</Badge>
          )}
          {job.employment_type.toLowerCase() === 'part-time' && (
            <Badge variant={'part_time'}>{job.employment_type}</Badge>
          )}
          {job.employment_type.toLowerCase() === 'internship' && (
            <Badge variant={'internship'}>{job.employment_type}</Badge>
          )}
          {job.employment_type.toLowerCase() === 'contractor' && (
            <Badge variant={'contractor'}>{job.employment_type}</Badge>
          )}
        </>

        <div className="flex flex-col gap-2">
          <CardDescription className="flex justify-between">
            <span>Salary Range:</span>
            <span className="font-bold text-primary">
              {job.salary.min} - {job.salary.max} {job.salary.frequency}
            </span>
          </CardDescription>
          <CardDescription className="flex justify-between">
            <span>Posted:</span>
            <span className="font-bold text-primary">{formatTimestamp(job.created_at)}</span>
          </CardDescription>
          <CardDescription className="flex justify-between">
            <span>Total Applicants:</span>
            <span className="font-bold text-primary">{job.total_applicants}</span>
          </CardDescription>
        </div>

        <div className="w-full flex gap-2">
          <Button className="w-3/4" asChild>
            <Link href={`/jobs/${job.id}`}>
              <Users />
              <span>View Job Pipeline</span>
            </Link>
          </Button>
          <Button variant={'outline'} className="w-1/4" asChild>
            <Link href={`/jobs/${job.id}/edit-job`}>
              <NotebookPen />
              <span>Edit</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobItem;
