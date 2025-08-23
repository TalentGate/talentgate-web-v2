import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';

interface SearchFieldProps {
  placeholder?: string;
}

const SearchField = ({ placeholder }: SearchFieldProps) => {
  return (
    <div className="relative w-full">
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-5 stroke-muted-foreground" />
      <Input className="pl-10" placeholder={placeholder ?? 'Search...'} />
    </div>
  );
};

export default SearchField;
