import SearchField from "@/components/input/search-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchAndFilterGroup = () => {
  return (
    <section className="flex items-center gap-4 flex-wrap lg:flex-nowrap">
      <SearchField placeholder="Search Positions ..." />

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Engineering</SelectItem>
          <SelectItem value="dark">Marketing</SelectItem>
          <SelectItem value="system">Data Science</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Full-Time</SelectItem>
          <SelectItem value="dark">Part-Time</SelectItem>
          <SelectItem value="system">Internship</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">New York, USA</SelectItem>
          <SelectItem value="dark">Talinn, Estonia</SelectItem>
          <SelectItem value="system">Istanbul, Turkey</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Location Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Remote</SelectItem>
          <SelectItem value="dark">Hybrid</SelectItem>
          <SelectItem value="system">On-site</SelectItem>
        </SelectContent>
      </Select>
    </section>
  );
};

export default SearchAndFilterGroup;
