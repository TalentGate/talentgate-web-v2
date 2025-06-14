import Header from "@/components/section/header";
import AccountInformation from "./_components/card/account-information";
import ChangePassword from "./_components/card/change-password";

const MyAccount = () => {
  return (
    <main className="p-6 space-y-6 h-full w-full">
      <Header
        header="My Account"
        description="You can modify your account information and change password from this page."
      />
      <AccountInformation />
      <ChangePassword />
    </main>
  );
};

export default MyAccount;
