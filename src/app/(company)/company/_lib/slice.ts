import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '@/app/api/baseQuery';
import {
  CreatePaddleCheckoutRequest,
  CreatePaddleCheckoutResponse,
} from '@/app/(company)/company/billing-and-subscription/_lib/slice';

export interface RetrieveCurrentCompanyResponse {
  name?: string;
  overview?: string;
  links?: Array<{
    id?: number;
    type?: string;
    url?: string;
  }>;
  locations?: Array<{
    id?: number;
    type?: string;
    latitude?: string;
    longitude?: string;
    address?: {
      id?: number;
      unit?: string;
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      postal_code?: string;
    };
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
  locations?: Array<{
    id?: number;
    type?: string;
    latitude?: string;
    longitude?: string;
    address?: {
      id?: number;
      unit?: string;
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      postal_code?: string;
    };
  }>;
}

export interface UpdateCurrentCompanyError {
  detail: string;
}

export interface InviteEmployeeResponse {}

export interface InviteEmployeeRequest {
  title: string;
  email: string;
}

export interface InviteEmployeeError {
  detail: string;
}

export interface AcceptEmployeeInvitationResponse {
  access_token?: string;
  refresh_token?: string;
}

export interface AcceptEmployeeInvitationRequest {
  token?: string;
}

export interface AcceptEmployeeInvitationError {
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
    inviteEmployee: builder.mutation<InviteEmployeeResponse, InviteEmployeeRequest>({
      query: (body) => ({
        url: 'me/company/employee/invite',
        method: 'POST',
        body: body,
      }),
    }),
    acceptEmployeeInvitation: builder.mutation<
      AcceptEmployeeInvitationResponse,
      AcceptEmployeeInvitationRequest
    >({
      query: (body) => ({
        url: 'me/company/employee/invitation/accept',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {
  useRetrieveCurrentCompanyQuery,
  useRetrieveCurrentCompanyLogoMutation,
  useUpdateCurrentCompanyMutation,
  useUploadCurrentCompanyLogoMutation,
  useInviteEmployeeMutation,
  useAcceptEmployeeInvitationMutation,
} = companiesApi;
