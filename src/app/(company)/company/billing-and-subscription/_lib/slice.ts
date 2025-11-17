import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '@/app/api/baseQuery';

export interface CreatePaddleCheckoutResponse {
  transaction_id: string;
}

export interface CreatePaddleCheckoutRequest {
  transaction_id: string;
}

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createPaddleCheckout: builder.mutation<
      CreatePaddleCheckoutResponse,
      CreatePaddleCheckoutRequest
    >({
      query: (body) => ({
        url: 'payment/checkout',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useCreatePaddleCheckoutMutation } = paymentApi;
