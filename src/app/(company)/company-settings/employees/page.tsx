import { DataTable } from "./_components/table/data-table";
import { columns, DataTableEmployeeType } from "./_components/table/columns";
import Header from "@/components/section/header";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Link from "next/link";

const mockData: DataTableEmployeeType[] = [
  {
    id: "1",
    username: "john.smith",
    firstname: "John",
    lastname: "Smith",
    email: "sFt2l@example.com",
    title: "HR Partner",
    role: "ADMIN",
    verified: true,
  },
  {
    id: "2",
    firstname: "Jane",
    lastname: "Smith",
    username: "jane.smith",
    email: "jBk5g@example.com",
    title: "UX Designer",
    role: "OWNER",
    verified: false,
  },
];

const Employees = () => {
  return (
    <main className="p-6 space-y-6 h-full w-full">
      <div className="flex items-center justify-between">
        <Header
          header="Employees"
          description="Manage and review all employees in one place"
        />

        <Button asChild>
          <Link href="/company-settings/employees/new-employee">
            <UserPlus />
            <span>Add new employee</span>
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={mockData} />
    </main>
  );
};

export default Employees;
