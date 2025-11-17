import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, FunnelX } from 'lucide-react';
import { useState } from 'react';

const JOB_TYPE_OPTIONS = [
  {
    id: 'Remote',
    label: 'Remote',
  },
  {
    id: 'Hybrid',
    label: 'Hybrid',
  },
  {
    id: 'Onsite',
    label: 'On-Site',
  },
];

interface LocationTypeFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const LocationTypeFilter = ({ value, onChange }: LocationTypeFilterProps) => {
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  const handleCheckedChange = (checked: boolean, typeId: string) => {
    let newSelectedTypes: string[];

    if (checked) {
      newSelectedTypes = [...value, typeId];
    } else {
      newSelectedTypes = value.filter((id) => id !== typeId);
    }

    onChange(newSelectedTypes);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <DropdownMenu open={dropdownMenuOpen} onOpenChange={setDropdownMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button className={'text-muted-foreground w-full justify-between'} variant="outline">
          {value.length > 0 ? (
            <span className={'text-foreground'}>{value.length} Location Type Selected</span>
          ) : (
            <span>Location Type</span>
          )}
          <ChevronDown className={value.length > 0 ? 'stroke-foreground' : ''} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Location Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {JOB_TYPE_OPTIONS.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.id}
            checked={value.includes(option.id)}
            onCheckedChange={(checked) => handleCheckedChange(checked, option.id)}
            onSelect={(e) => e.preventDefault()}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleClearAll}>
          <FunnelX />
          <span>Uncheck All Options</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Button
          variant={'outline'}
          className={'w-full'}
          onClick={() => setDropdownMenuOpen(!dropdownMenuOpen)}
        >
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocationTypeFilter;
