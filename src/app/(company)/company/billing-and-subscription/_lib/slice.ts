import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '@/app/api/baseQuery';

export interface UpdatePaddleCheckoutResponse {
  transaction_id: string;
  subscription_id: string;
  plan: string;
  start_date: string;
  end_date: string;
}

export interface UpdatePaddleCheckoutRequest {
  transaction_id: string;
}

export interface UpdatePaddleCheckoutError {
  detail: string;
}

export interface RetrieveInvoiceResponse {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

export interface RetrieveInvoicesRequest {
  token?: string;
}

export interface RetrieveInvoiceDocumentResponse {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

export interface RetrieveInvoiceDocumentRequest {
  transaction_id?: string;
}

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    updatePaddleCheckout: builder.mutation<
      UpdatePaddleCheckoutResponse,
      UpdatePaddleCheckoutRequest
    >({
      query: (body) => ({
        url: 'payment/checkout',
        method: 'POST',
        body: body,
      }),
    }),
    retrieveInvoices: builder.mutation<RetrieveInvoiceResponse[], RetrieveInvoicesRequest>({
      query: () => ({
        url: 'payment/invoices',
        method: 'GET',
      }),
    }),
    retrieveInvoiceDocument: builder.mutation<Blob, string>({
      query: (transaction_id) => ({
        url: `payment/transactions/${transaction_id}/invoice/document`,
        method: 'GET',
        responseHandler: async (response) => {
          // Parse response as Blob instead of JSON
          return response.blob();
        },
      }),
    }),
  }),
});

export const {
  useUpdatePaddleCheckoutMutation,
  useRetrieveInvoicesMutation,
  useRetrieveInvoiceDocumentMutation,
} = paymentApi;
