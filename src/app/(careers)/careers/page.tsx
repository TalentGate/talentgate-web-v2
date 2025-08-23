import Header from '@/components/section/header';

import JobGrid from './_components/section/job-grid';
import SearchAndFilterGroup from './_components/section/search-and-filter-group';

const Careers = () => {
  return (
    <main className="p-6 space-y-6 h-full w-full">
      <Header
        header="Open Positions"
        description="We are always looking for talented individuals to join our team."
      />
      <SearchAndFilterGroup />
      <JobGrid />
    </main>
  );
};

export default Careers;
