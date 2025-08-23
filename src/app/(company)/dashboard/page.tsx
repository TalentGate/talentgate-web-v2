import Header from '@/components/section/header';

import AverageTimeToHire from './_components/card/average-time-to-hire';
import InterviewsScheduledToday from './_components/card/interviews-scheduled-today copy';
import LongestActiveJob from './_components/card/longest-active-job';
import NewApplicantsToday from './_components/card/new-applicants-today';
import OverallPipelinesOverview from './_components/card/overall-pipelines-overview';
import TotalActiveJobs from './_components/card/total-active-jobs';
import TotalApplications from './_components/card/total-applications';
import UpcomingInterviews from './_components/card/upcoming-interviews';

export default function Dashboard() {
  return (
    <main className="p-6 w-full h-fit space-y-6">
      <Header
        header="Dashboard"
        description="Dashboard of the company. You can see the overview of the jobs, applications, pipelines, scheduled interviews, etc."
      />

      <section className="grid grid-cols-4 gap-4">
        <TotalActiveJobs />
        <TotalApplications />
        <InterviewsScheduledToday />
        <NewApplicantsToday />

        <div className="col-span-4 grid grid-cols-2 gap-4">
          <AverageTimeToHire />
          <LongestActiveJob />
        </div>

        <div className="col-span-4 grid grid-cols-2 gap-4">
          <OverallPipelinesOverview />
          <UpcomingInterviews />
        </div>
      </section>
    </main>
  );
}
