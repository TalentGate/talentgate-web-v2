import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadcrumbProps {
  formPage: number;
  setFormPage: Function;
}

const CreateJobBreadcrumb = ({ formPage, setFormPage }: BreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {formPage === 1 ? (
            <BreadcrumbPage>Step 1: Job Details</BreadcrumbPage>
          ) : (
            <BreadcrumbLink onClick={() => setFormPage(1)} className="cursor-pointer">
              Step 1: Job Details
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {formPage === 2 ? (
            <BreadcrumbPage>Step 2: Application Form</BreadcrumbPage>
          ) : (
            <BreadcrumbLink onClick={() => setFormPage(2)} className="cursor-pointer">
              Step 2: Application Form
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {formPage === 3 ? (
            <BreadcrumbPage>Step 3: Pipeline Observers</BreadcrumbPage>
          ) : (
            <BreadcrumbLink onClick={() => setFormPage(3)} className="cursor-pointer">
              Step 3: Pipeline Observers
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {formPage === 4 ? (
            <BreadcrumbPage>Step 4: Publish Job Post</BreadcrumbPage>
          ) : (
            <BreadcrumbLink onClick={() => setFormPage(4)} className="cursor-pointer">
              Step 4: Publish Job Post
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CreateJobBreadcrumb;
