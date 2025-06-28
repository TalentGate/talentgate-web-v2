import ApplicationForm from "./_components/card/application-form";
import JobDetails from "./_components/card/job-details";
import PipelineObservers from "./_components/card/pipeline-observers";
import PublishJobPost from "./_components/card/publish-job-post";

const mockAddJobFormStep = [
  "CV?",
  "Name?",
  "Surname?",
  "Email?",
  "Phone?",
  "Location?",
  "City?",
  "Country?",
  "Linkedin URL?",
  "Personal Portfolio?",
  "Cover Letter",
  "CV?",
  "Name?",
  "Surname?",
  "Email?",
  "Phone?",
  "Location?",
  "City?",
  "Country?",
  "Linkedin URL?",
  "Personal Portfolio?",
  "Cover Letter",
];

const mockAddObserversFormStep = [
  "Name Surname 1",
  "Name Surname 2",
  "Name Surname 3",
  "Name Surname 4",
  "Name Surname 5",
  "Name Surname 6",
  "Name Surname 7",
  "Name Surname 8",
  "Name Surname 9",
  "Name Surname 10",
];

const EditJob = () => {
  return (
    <main className="space-y-6 p-6 w-full h-full">
      <JobDetails />
      <ApplicationForm mockAddJobFormStep={mockAddJobFormStep} />
      <PipelineObservers mockAddObserversFormStep={mockAddObserversFormStep} />
      <PublishJobPost />
    </main>
  );
};

export default EditJob;
