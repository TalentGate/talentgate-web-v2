import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '@/app/api/baseQuery';

export interface RetrieveCurrentCompanyResponse {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

export interface RetrieveCurrentCompanyRequest {
  token?: string;
}

export interface RetrieveCurrentCompanyError {
  detail: string;
}

export const companiesApi = createApi({
  reducerPath: 'companiesApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    retrieveCurrentCompany: builder.mutation<
      RetrieveCurrentCompanyResponse,
      RetrieveCurrentCompanyRequest
    >({
      query: () => ({
        url: '/me/company',
        method: 'GET',
      }),
    }),
    retrieveCurrentCompanyLogo: builder.mutation<
      RetrieveCurrentCompanyResponse,
      RetrieveCurrentCompanyRequest
    >({
      query: () => ({
        url: '/me/company/logo',
        method: 'GET',
      }),
    }),
  }),
});

export const { useRetrieveCurrentCompanyMutation, useRetrieveCurrentCompanyLogoMutation } =
  companiesApi;
