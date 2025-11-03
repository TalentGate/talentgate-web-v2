'use client';

import { Paddle } from '@paddle/paddle-js';

import { Button } from '@/components/ui/button';
import { usePaddle } from '@/hooks/use-paddle';

// const starterProduct = 'pro_01k7c3gjc334s49mn5ds4zafnc';
// const proProduct = 'pro_01k7ctxdhfp67ff6hwwr69cren';
const monthItems = [
  {
    quantity: 1,
    priceId: 'pri_01k7c3j010wg96nhzcxdzhey9n',
  },
  {
    quantity: 1,
    priceId: 'pri_01k7ctyrsc4h3pxtarv75mmdcb',
  },
];
const yearItems = [
  {
    quantity: 1,
    priceId: 'pri_01k7cv21eb5xem5fy21ct7t1pm',
  },
  {
    quantity: 1,
    priceId: 'pri_01k7cv0k014a6d6rp8jr0ppth7',
  },
];
const customerInfo = {
  email: 'cerrahoglu.erim@gmail.com',
};

function Checkout({
  title,
  className,
  disabled,
}: {
  title: string;
  className?: string;
  disabled?: boolean;
}) {
  const paddle = usePaddle();

  // TODO: Fetch customer info from backend and pass it to Paddle Checkout if such customer exists already.

  const handleCheckout = () => {
    paddle!.Checkout.open({
      items: monthItems,
      customer: customerInfo,
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
        // successUrl: "http://localhost:3000/company-settings/billing-and-subscription"
      },
    });
  };

  return (
    <Button disabled={disabled} onClick={handleCheckout} className={className}>
      {title}
    </Button>
  );
}

export default Checkout;
