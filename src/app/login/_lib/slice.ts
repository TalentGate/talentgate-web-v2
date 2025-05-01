import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface LoginResponse {
    access_token?: string;
    refresh_token?: string;
}

export interface LoginRequest {
    email?: string;
    password?: string;
}

export interface LoginError {
    detail: string;
}

export const loginApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login` }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: 'posts',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const { useLoginMutation } = loginApi;