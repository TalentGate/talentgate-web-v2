import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const filter_options = ['Remote', 'Hybrid', 'On-Site'];

const LocationTypeFilter = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Location Type" />
      </SelectTrigger>
      <SelectContent>
        {filter_options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LocationTypeFilter;
