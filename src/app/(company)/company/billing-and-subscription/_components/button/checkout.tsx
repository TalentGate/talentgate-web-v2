'use client';

import { Button } from '@/components/ui/button';
import { usePaddle } from '@/hooks/use-paddle';

// const starterProduct = 'pro_01k7c3gjc334s49mn5ds4zafnc';
// const proProduct = 'pro_01k7ctxdhfp67ff6hwwr69cren';
const items = [
  { quantity: 1, priceId: 'pri_01k9mg56qkzs1g57m5pjaymx52' },
  // { quantity: 1, priceId: 'pri_01k9mgyxdqj8ym2ey7wtge5ja0' },
  // { quantity: 1, priceId: 'pri_01k9n20hkm645z3m2mbwzqwya3' },
  // { quantity: 1, priceId: 'pri_01k9n226yxc9jaq5n1r4dcvabg' },
];

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
      items: items,
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
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
