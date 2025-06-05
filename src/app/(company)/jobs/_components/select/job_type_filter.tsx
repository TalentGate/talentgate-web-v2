import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const filter_options = ["Full-Time", "Part-Time", "Internship"];

const JobTypeFilter = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Job Type" />
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

export default JobTypeFilter;
