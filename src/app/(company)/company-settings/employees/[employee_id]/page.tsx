import EmployeeInformation from './_components/card/employee-information';
import ResetPassword from './_components/card/reset-password';

const EmployeeDetails = () => {
  return (
    <div className="p-6 space-y-6 h-full w-full">
      <EmployeeInformation />
      <ResetPassword />
    </div>
  );
};

export default EmployeeDetails;
