import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown, FunnelX} from "lucide-react";
import {useState} from "react";

const DEPARTMENT_OPTIONS = [
    {
        label: 'DEPARTMENT_1',
        id: 'DEPARTMENT_1'
    },
    {
        label: 'DEPARTMENT_2',
        id: 'DEPARTMENT_2'
    },
    {
        label: 'DEPARTMENT_3',
        id: 'DEPARTMENT_3'
    },
    {
        label: 'DEPARTMENT_4',
        id: 'DEPARTMENT_4'
    }
];

type DepartmentFilterProps = {
    value: string[];
    onChange: (value: string[]) => void;
};

const DepartmentFilter = ({value, onChange}: DepartmentFilterProps) => {
    const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

    const handleCheckedChange = (checked: boolean, departmentLabel: string) => {
        let newSelectedDepartments: string[];

        if (checked) {
            newSelectedDepartments = [...value, departmentLabel];
        } else {
            newSelectedDepartments = value.filter((label) => label !== departmentLabel);
        }

        onChange(newSelectedDepartments);
    };

    const handleClearAll = () => {
        onChange([]);
    };

    return (
        <DropdownMenu open={dropdownMenuOpen} onOpenChange={setDropdownMenuOpen}>
            <DropdownMenuTrigger asChild>
                <Button className={"text-muted-foreground w-full justify-between"} variant="outline">
                    {value.length > 0 ? (
                        <span className={"text-foreground"}>{value.length} Departments Selected</span>
                    ) : (
                        <span>Departments</span>
                    )}
                    <ChevronDown className={value.length > 0 ? "stroke-foreground" : ""}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Departments</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {DEPARTMENT_OPTIONS.map((option) => (
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

export default DepartmentFilter;