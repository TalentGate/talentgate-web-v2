import {createApi} from '@reduxjs/toolkit/query/react';

import {baseQueryWithReauth} from '@/app/api/baseQuery';

export interface UpdatePaddleCheckoutResponse {
    "transaction_id": string,
    "subscription_id": string,
    "plan": string,
    "start_date": string,
    "end_date": string,
}

export interface UpdatePaddleCheckoutRequest {
    "transaction_id": string,
}

export interface UpdatePaddleCheckoutError {
    detail: string;
}

export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        updatePaddleCheckout: builder.mutation<UpdatePaddleCheckoutResponse, UpdatePaddleCheckoutRequest>({
            query: (body) => ({
                url: 'payment/checkout',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const {
    useUpdatePaddleCheckoutMutation,
} = paymentApi;
