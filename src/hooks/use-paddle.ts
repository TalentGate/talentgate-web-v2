'use client';

import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { useEffect, useState } from 'react';
import { useUpdatePaddleCheckoutMutation } from '@/app/(company)/company/billing-and-subscription/_lib/slice';
import { toast } from 'sonner';

export const usePaddle = () => {
  const [paddle, setPaddle] = useState<Paddle | undefined>();
  const [
    updatePaddleCheckout,
    {
      // data: updatePaddleCheckoutData,
      // isLoading: isUpdatePaddleCheckoutLoading,
      isSuccess: isUpdatePaddleCheckoutSuccess,
    },
  ] = useUpdatePaddleCheckoutMutation();

  useEffect(() => {
    initializePaddle({
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
      environment: 'sandbox',
      eventCallback: (data) => {
        if (data.name === 'checkout.completed') {
          updatePaddleCheckout({ transaction_id: data.data!.transaction_id });
        }
      },
    }).then((instance) => {
      if (instance) {
        setPaddle(instance);
      }
    });
  }, []);

  useEffect(() => {
    if (!isUpdatePaddleCheckoutSuccess) return;

    paddle?.Checkout.close();
    toast.success('Checkout Successful! Your new subscription has been activated.');
  }, [isUpdatePaddleCheckoutSuccess]);

  return paddle;
};
