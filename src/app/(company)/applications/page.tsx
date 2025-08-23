import Header from '@/components/section/header';

import { columns, DataTableApplicationType } from './_components/table/columns';
import { DataTable } from './_components/table/data-table';

async function getData(): Promise<DataTableApplicationType[]> {
  return [
    {
      id: '1',
      name: 'John Doe',
      email: '7bGxT@example.com',
      applied_position: 'Software Engineer',
      applied_at: '2023-09-11T10:00:00.000Z',
      status: 'Interview',
      rating: 4,
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jBk5g@example.com',
      applied_position: 'UX Designer',
      applied_at: '2023-09-12T14:00:00.000Z',
      status: 'Applied',
      rating: 3,
    },
    {
      id: '3',
      name: 'Bobby Tables',
      email: 'G3Y5R@example.com',
      applied_position: 'DevOps Engineer',
      applied_at: '2023-09-13T09:00:00.000Z',
      status: 'Screening',
      rating: 5,
    },
    {
      id: '4',
      name: 'Pamela Anderson',
      email: 'pamela.anderson@example.com',
      applied_position: 'Full Stack Developer',
      applied_at: '2023-09-14T12:00:00.000Z',
      status: 'Offer',
      rating: 4,
    },
  ];
}

const Application = async () => {
  const data = await getData();

  return (
    <main className="p-6 space-y-6 h-full w-full">
      <Header
        header="Applications"
        description="Manage and review all job applications in one place"
      />

      <DataTable columns={columns} data={data} />
    </main>
  );
};

export default Application;
