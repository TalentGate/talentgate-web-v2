import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '@/app/api/baseQuery';

export interface RetrieveCurrentCompanyResponse {
  name?: string;
  overview?: string;
  links?: Array<{
    id?: number;
    type?: string;
    url?: string;
  }>;
}

export interface RetrieveCurrentCompanyRequest {
  token?: string;
}

export interface RetrieveCurrentCompanyError {
  detail: string;
}

export interface UpdateCurrentCompanyResponse {
  name?: string;
  overview?: string;
}

export interface UpdateCurrentCompanyRequest {
  name?: string;
  overview?: string;
  links?: Array<{
    id?: number;
    type?: string;
    url?: string;
  }>;
}

export interface UpdateCurrentCompanyError {
  detail: string;
}

export const companiesApi = createApi({
  reducerPath: 'companiesApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    retrieveCurrentCompany: builder.query<
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
    updateCurrentCompany: builder.mutation<
      UpdateCurrentCompanyResponse,
      UpdateCurrentCompanyRequest
    >({
      query: (body) => ({
        url: '/me/company',
        method: 'PUT',
        body: body,
      }),
    }),
    uploadCurrentCompanyLogo: builder.mutation<void, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: '/me/company/logo',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useRetrieveCurrentCompanyQuery,
  useRetrieveCurrentCompanyLogoMutation,
  useUpdateCurrentCompanyMutation,
  useUploadCurrentCompanyLogoMutation,
} = companiesApi;
