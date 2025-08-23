import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AddEvaluation from './_components/card/add-evaluation';
import AskedQuestions from './_components/card/asked-questions';
import Comments from './_components/card/evaluations';
import MeetingsAndInterviews from './_components/card/meetings-and-interviews';
import PersonalInfo from './_components/card/personal-info';
import Header from './_components/header/header';
import PipelineInfoCards from './_components/section/pipeline-info-cards';

const ApplicationDetails = () => {
  return (
    <main className="p-6 space-y-6 h-full w-full">
      <Header
        applicant_name="John Doe"
        application_position="Software Engineer"
        applied_at="Jan 15, 2024"
      />
      <Tabs defaultValue="Overview" className="w-full h-full">
        <TabsList className="w-full mb-2">
          <TabsTrigger value="Overview">Overview</TabsTrigger>
          <TabsTrigger value="Evaluations">Evaluations</TabsTrigger>
          <TabsTrigger value="CV">CV</TabsTrigger>
          <TabsTrigger value="Meetings">Meetings & Interviews</TabsTrigger>
        </TabsList>
        <TabsContent value="Overview" className="space-y-6 h-full w-full">
          <PipelineInfoCards />
          <PersonalInfo />
          <AskedQuestions />
        </TabsContent>

        <TabsContent value="Evaluations" className="space-y-6 h-full w-full">
          <Comments />
          <AddEvaluation />
        </TabsContent>

        <TabsContent value="CV" className="h-full w-full">
          <iframe className="h-full w-full" src="/assets/resume.pdf" />
        </TabsContent>

        <TabsContent value="Meetings">
          <MeetingsAndInterviews />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default ApplicationDetails;
