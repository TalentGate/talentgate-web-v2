import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '@/app/api/baseQuery';

export interface RetrieveCurrentUserResponse {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

export interface RetrieveCurrentUserRequest {
  token?: string;
}

export interface RetrieveCurrentUserError {
  detail: string;
}

export interface UpdateCurrentUserResponse {
  access_token?: string;
  refresh_token?: string;
}

export interface UpdateCurrentUserRequest {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
}

export interface UpdateCurrentUserError {
  detail: string;
}

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

export interface RetrieveSubscriptionResponse {
  plan: string;
  status: string;
  start_date: number;
  end_date: number;
  next_billing_date: number;
  amount: string;
}

export type RetrieveSubscriptionRequest = object;

export interface RetrieveUnitPriceResponse {
  amount: string;
  currency_code: string;
}

export interface RetrievePriceResponse {
  billing_cycle: string;
  unit_price: RetrieveUnitPriceResponse;
}

export interface RetrieveProductResponse {
  name: string;
  description: string;
  prices: RetrievePriceResponse[];
}

export type RetrieveProductRequest = object;

export interface CancelSubscriptionResponse {
  subscription_id: string;
}

export type CancelSubscriptionRequest = object;

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    retrieveCurrentUser: builder.mutation<RetrieveCurrentUserResponse, RetrieveCurrentUserRequest>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
    }),
    retrieveCurrentUserProfile: builder.mutation<
      RetrieveCurrentUserResponse,
      RetrieveCurrentUserRequest
    >({
      query: () => ({
        url: '/me/profile',
        method: 'GET',
      }),
    }),
    updateCurrentUser: builder.mutation<UpdateCurrentUserResponse, UpdateCurrentUserRequest>({
      query: (body) => ({
        url: '/me',
        method: 'PUT',
        body: body,
      }),
    }),
    uploadCurrentUserProfile: builder.mutation<void, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: '/me/profile',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

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
          return response.blob();
        },
      }),
    }),
    retrieveSubscription: builder.mutation<
      RetrieveSubscriptionResponse,
      RetrieveSubscriptionRequest
    >({
      query: () => ({
        url: 'payment/subscription',
        method: 'GET',
      }),
    }),
    retrieveProducts: builder.mutation<RetrieveProductResponse[], RetrieveProductRequest>({
      query: () => ({
        url: 'payment/products',
        method: 'GET',
      }),
    }),
    cancelSubscription: builder.mutation<CancelSubscriptionResponse, CancelSubscriptionRequest>({
      query: (body) => ({
        url: 'payment/subscription/cancel',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {
  useRetrieveCurrentUserMutation,
  useRetrieveCurrentUserProfileMutation,
  useUpdateCurrentUserMutation,
  useUploadCurrentUserProfileMutation,
} = usersApi;

export const {
  useUpdatePaddleCheckoutMutation,
  useRetrieveInvoicesMutation,
  useRetrieveInvoiceDocumentMutation,
  useRetrieveSubscriptionMutation,
  useRetrieveProductsMutation,
  useCancelSubscriptionMutation,
} = paymentApi;
