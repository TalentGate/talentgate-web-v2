'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"


type Job = {
    id: string
    title: string
    company: string
    location: string
    type: string
    postedAt: string
    description: string
}

interface JobCardProps {
    job: Job
}

export function JobCard({ job }: JobCardProps) {

    return (
        <Card className="h-full flex flex-col justify-between p-6">
            <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    {job.company} • {job.location} • {job.type}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm line-clamp-3">{job.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Posted on {job.postedAt}</span>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm" variant="outline">View</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>{job.title}</DialogTitle>
                        <DialogDescription>{job.description}</DialogDescription>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}


const jobs = [
    {
        id: "1",
        title: "Frontend Developer",
        company: "Tech Corp",
        location: "Remote",
        type: "Full-time",
        postedAt: "May 9, 2025",
        description: "We’re looking for a React developer with experience in Next.js and Tailwind CSS."
    },
    {
        id: "2",
        title: "Backend Engineer",
        company: "API Solutions",
        location: "New York, NY",
        type: "Part-time",
        postedAt: "May 7, 2025",
        description: "Join our backend team to work on scalable APIs using Node.js and PostgreSQL."
    },
    {
        id: "3",
        title: "Backend Engineer",
        company: "API Solutions",
        location: "New York, NY",
        type: "Part-time",
        postedAt: "May 7, 2025",
        description: "Join our backend team to work on scalable APIs using Node.js and PostgreSQL."
    },
]

function JobsList() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {jobs.map(job => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    )
}

export default function Jobs() {
    return (
        <main>
            <div className="p-6">
                <h1 className="text-3xl font-semibold mb-6">Available Jobs</h1>
                <JobsList />
            </div>
            {/*<div className="flex flex-1 flex-col gap-4 p-4">*/}
            {/*    <div className="grid auto-rows-min gap-4 md:grid-cols-3">*/}
            {/*        <div className="aspect-video rounded-xl bg-muted/50" >*/}
            {/*            Jobs*/}
            {/*        </div>*/}
            {/*        <div className="aspect-video rounded-xl bg-muted/50" />*/}
            {/*        <div className="aspect-video rounded-xl bg-muted/50" />*/}
            {/*    </div>*/}
            {/*    <div className="grid auto-rows-min gap-4 md:grid-cols-3">*/}
            {/*        <div className="aspect-video rounded-xl bg-muted/50" />*/}
            {/*        <div className="aspect-video rounded-xl bg-muted/50" />*/}
            {/*        <div className="aspect-video rounded-xl bg-muted/50" />*/}
            {/*    </div>*/}
            {/*    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />*/}
            {/*</div>*/}
        </main>
    );
}
