import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

interface TitleSearchFilterProps {
  setTitle: (value: string) => void;
  className?: string;
}

const TitleSearchFilter = ({ setTitle, className }: TitleSearchFilterProps) => {
  const [text, setText] = useState<string>();
  const [value] = useDebounce(text, 1_000);

  useEffect(() => {
    if (value === undefined) return;
    setTitle(value);
  }, [value]);

  return (
    <div className={`relative w-full ${className}`}>
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-5 stroke-muted-foreground" />
      <Input
        type="text"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setTitle(text || '');
          }
        }}
        onChange={(e) => {
          setText(e.target.value);
        }}
        className="pl-10"
        placeholder="Search jobs..."
      />
    </div>
  );
};

export default TitleSearchFilter;
