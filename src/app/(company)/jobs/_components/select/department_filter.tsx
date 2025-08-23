import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const filter_options = ['Engineering', 'Design', 'Product', 'Sales', 'Marketing'];

const DepartmentFilter = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Department" />
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

export default DepartmentFilter;
