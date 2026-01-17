import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Fragment } from 'react';

interface BreadcrumbProps {
  formPage: number;
  setFormPage: Function;
  breadcrumbItems: {
    step: number;
    label: string;
  }[];
}

const CreateJobBreadcrumb = ({ formPage, setFormPage, breadcrumbItems }: BreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <Fragment key={item.step}>
            <BreadcrumbItem key={item.step}>
              {formPage === item.step ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink onClick={() => setFormPage(item.step)} className="cursor-pointer">
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {breadcrumbItems.length !== index + 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CreateJobBreadcrumb;
