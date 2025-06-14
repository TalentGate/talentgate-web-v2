import Header from "@/components/section/header";
import AddEmployee from "./_components/card/add-employee";

const NewEmployee = () => {
  return (
    <main className="p-6 space-y-6 h-full w-full">
      <Header
        header="Add New Employee"
        description="You can create a new employee from this section. After the required details are provided, an email will be sent to the employee alogn with their temporary password."
      />

      <AddEmployee />
    </main>
  );
};

export default NewEmployee;
