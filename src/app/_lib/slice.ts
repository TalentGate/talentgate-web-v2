import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface LogoutResponse {
    access_token?: string;
    refresh_token?: string;
}

export interface LogoutRequest {
    token?: string;
}

export interface LogoutError {
    detail: string;
}

export const logoutApi = createApi({
    reducerPath: 'logoutApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth`, credentials: "include" }),
    endpoints: (builder) => ({
        logout: builder.mutation<LogoutResponse, LogoutRequest>({
            query: (body) => ({
                url: 'logout',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const { useLogoutMutation } = logoutApi;
