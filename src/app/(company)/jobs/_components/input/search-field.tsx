import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';

const SearchField = () => {
  return (
    <div className="relative w-full md:w-fit flex-grow">
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-5 stroke-muted-foreground" />
      <Input className="pl-10" placeholder="Search jobs..." />
    </div>
  );
};

export default SearchField;
