import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Briefcase,
  Copy,
  Ellipsis,
  EyeIcon,
  MapPinIcon,
  NotebookPen,
  SquarePen,
  Trash2,
  Users,
} from "lucide-react";
import { Job } from "../../page";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface JobItemProps {
  job: Job;
}

const JobItem = ({ job }: JobItemProps) => {
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
                <span>{job.location}</span>
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
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
              <DropdownMenuItem variant="destructive">
                <Trash2 />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <>
          {job.type === "Full-time" && (
            <Badge variant={"full_time"}>{job.type}</Badge>
          )}
          {job.type === "Part-time" && (
            <Badge variant={"part_time"}>{job.type}</Badge>
          )}
          {job.type === "Internship" && (
            <Badge variant={"internship"}>{job.type}</Badge>
          )}
        </>

        <div className="flex flex-col gap-2">
          <CardDescription className="flex justify-between">
            <span>Salary Range:</span>
            <span className="font-bold text-primary">{job.salary_range}</span>
          </CardDescription>
          <CardDescription className="flex justify-between">
            <span>Posted:</span>
            <span className="font-bold text-primary">{job.postedAt}</span>
          </CardDescription>
          <CardDescription className="flex justify-between">
            <span>Total Applicants:</span>
            <span className="font-bold text-primary">
              {job.total_applicants}
            </span>
          </CardDescription>
        </div>

        <div className="w-full flex gap-2">
          <Button className="w-3/4" asChild>
            <Link href={`/jobs/${job.id}`}>
              <Users />
              <span>View Job Pipeline</span>
            </Link>
          </Button>
          <Button variant={"outline"} className="w-1/4" asChild>
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
