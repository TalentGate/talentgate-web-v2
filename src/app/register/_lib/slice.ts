import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface RegisterResponse {
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
}

export interface RegisterRequest {
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    password?: string;
}

export interface RegisterError {
    detail: string;
}

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth` }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: 'register',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
