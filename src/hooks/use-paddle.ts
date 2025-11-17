'use client';

import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { useCreatePaddleCheckoutMutation } from '@/app/(company)/company/billing-and-subscription/_lib/slice';

export const usePaddle = () => {
  const [paddle, setPaddle] = useState<Paddle | undefined>();
  const [createPaddleCheckout, { isSuccess: isCreatePaddleCheckoutSuccess }] =
    useCreatePaddleCheckoutMutation();

  useEffect(() => {
    initializePaddle({
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
      environment: process.env.NEXT_PUBLIC_PADDLE_ENV,
      eventCallback: (event) => {
        if (event.name === 'checkout.completed' && event.data?.transaction_id) {
          createPaddleCheckout({ transaction_id: event.data!.transaction_id });
        }
      },
    }).then((value) => {
      if (value) {
        setPaddle(value);
      }
    });
  }, [createPaddleCheckout]);

  useEffect(() => {
    if (isCreatePaddleCheckoutSuccess) {
      paddle?.Checkout.close();
      toast.success('Subscription Updated', {
        description: 'Your subscription has been successfully updated.',
      });
    }
  }, [isCreatePaddleCheckoutSuccess, paddle]);

  return paddle;
};
