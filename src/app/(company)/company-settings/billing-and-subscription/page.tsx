import Header from '@/components/section/header';
import { Button } from '@/components/ui/button';

const BillingAndSubscription = () => {
  return (
    <main className="p-6 space-y-6 h-full w-full">
      <Header
        header="Billing and Subscription"
        description="Manage billing and subscription details."
      />

      <section className="w-full rounded-md bg-card p-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-semibold">Enterprise Plan</p>
          <p className="text-muted-foreground text-sm">$99/month • Unlimited users</p>
        </div>
        <Button>Change Plan</Button>
      </section>

      <section className="space-y-2">
        <h3 className="font-semibold text-lg mb-4">Usage this month</h3>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Active Jobs</p>
          <p>12 / Unlimited</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-semibold">Team Members</p>
          <p>8 / Unlimited</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-semibold">Applications Processed</p>
          <p>247 / Unlimited</p>
        </div>
      </section>
    </main>
  );
};

export default BillingAndSubscription;
