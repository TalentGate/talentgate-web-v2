import { Check, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

import Checkout from '../button/checkout';

type PlanCardProps = {
  title: string;
  description: string;
  price: string;
  features: string[];
  isEmphasized?: boolean;
  isCurrentPlan?: boolean;
};

const PlanCard = ({
  title,
  description,
  price,
  features,
  isEmphasized,
  isCurrentPlan,
}: PlanCardProps) => {
  return (
    <Card
      className={cn([
        'max-w-md mx-auto h-full relative',
        isEmphasized ? 'border-2 border-primary' : 'border',
      ])}
    >
      {isEmphasized && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-yellow-300 text-black">
            <Star className="fill-current" />
            <span>Most Popular</span>
          </Badge>
        </div>
      )}

      <CardHeader className="text-center">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="flex items-baseline gap-px mx-auto">
          <p className="text-2xl font-bold">${price}</p>
          <span className="text-muted-foreground text-sm">/month</span>
        </div>
      </CardHeader>

      <CardContent>
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <Check className="size-4 stroke-green-700" />
            <span>{feature}</span>
          </li>
        ))}
      </CardContent>

      <CardFooter className="w-full mt-auto">
        <Checkout
          className="w-full"
          disabled={isCurrentPlan}
          title={isCurrentPlan ? 'Current Plan' : 'Choose Plan'}
        />
      </CardFooter>
    </Card>
  );
};

const plans = [
  {
    title: 'Free Plan',
    description: 'Great for individuals getting started.',
    price: '0',
    features: [
      'Up to 10 active job postings',
      'Unlimited candidate applications',
      'Basic analytics and reporting',
      'Email support',
    ],
  },
  {
    title: 'Basic Plan',
    description: 'Perfect for small teams.',
    price: '9',
    features: [
      'Up to 50 active job postings',
      'Unlimited candidate applications',
      'Basic analytics and reporting',
      'Email and chat support',
    ],
    isEmphasized: true,
    isCurrentPlan: true,
  },
  {
    title: 'Pro Plan',
    description: 'Ideal for growing businesses.',
    price: '29',
    features: [
      'Up to 200 active job postings',
      'Unlimited candidate applications',
      'Advanced analytics and reporting',
      'Priority email and chat support',
      'Access to premium integrations',
      'Customizable hiring workflows',
      'Team collaboration features',
    ],
  },
];

function PlanPricing() {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="font-semibold text-xl">Choose a New Plan</h2>
        <p>Select the perfect plan for your hiring needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 w-fit mx-auto gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.title}
            title={plan.title}
            description={plan.description}
            price={plan.price}
            features={plan.features}
            isEmphasized={plan.isEmphasized}
            isCurrentPlan={plan.isCurrentPlan}
          />
        ))}
      </div>
    </section>
  );
}

export default PlanPricing;
