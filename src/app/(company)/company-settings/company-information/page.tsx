import Header from "@/components/section/header";
import CompanyOverview from "./_components/card/company-overview";
import CompanyAddress from "./_components/card/company-address";

const CompanyInformation = () => {
  return (
    <main className="p-6 space-y-6 h-full w-full">
      <Header
        header="Company Information"
        description="You can observe and modify general company information from this page."
      />

      <CompanyOverview />

      <CompanyAddress />
    </main>
  );
};

export default CompanyInformation;
