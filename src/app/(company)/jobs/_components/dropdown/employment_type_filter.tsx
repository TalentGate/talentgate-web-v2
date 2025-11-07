import {useState} from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown, FunnelX} from "lucide-react";

const EMPLOYMENT_TYPE_OPTIONS = [
    {
        id: 'Full-Time',
        label: 'Full-Time'
    },
    {
        id: 'Part-Time',
        label: 'Part-Time'
    },
    {
        id: 'Internship',
        label: 'Internship'
    },
    {
        id: 'Contractor',
        label: 'Contractor'
    }
];

type EmploymentTypeFilterProps = {
    value: string[];
    onChange: (value: string[]) => void;
};

const EmploymentTypeFilter = ({value, onChange}: EmploymentTypeFilterProps) => {
    const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

    const handleCheckedChange = (checked: boolean, option: string) => {
        let newSelectedOptions: string[];

        if (checked) {
            newSelectedOptions = [...value, option];
        } else {
            newSelectedOptions = value.filter((item) => item !== option);
        }

        onChange(newSelectedOptions);
    };

    const handleClearAll = () => {
        onChange([]);
    };

    return (
        <DropdownMenu open={dropdownMenuOpen} onOpenChange={setDropdownMenuOpen}>
            <DropdownMenuTrigger asChild>
                <Button className={"text-muted-foreground w-full justify-between"} variant="outline">
                    {value.length > 0 ? (
                        <span className={"text-foreground"}>{value.length} Employment Type Selected</span>
                    ) : (
                        <span>Employment Type</span>
                    )}
                    <ChevronDown className={value.length > 0 ? "stroke-foreground" : ""}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Employment Type</DropdownMenuLabel>
                <DropdownMenuSeparator/>

                {EMPLOYMENT_TYPE_OPTIONS.map((option) => (
                    <DropdownMenuCheckboxItem
                        key={option.id}
                        checked={value.includes(option.label)}
                        onCheckedChange={(checked) => handleCheckedChange(checked, option.label)}
                        onSelect={(e) => e.preventDefault()}
                    >
                        {option.label}
                    </DropdownMenuCheckboxItem>
                ))}

                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    variant="destructive"
                    onClick={handleClearAll}
                >
                    <FunnelX/>
                    <span>Uncheck All Options</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <Button variant={"outline"} className={"w-full"}
                        onClick={() => setDropdownMenuOpen(!dropdownMenuOpen)}>Apply</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default EmploymentTypeFilter;
