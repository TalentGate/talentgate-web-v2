import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface GoogleResponse {
    access_token?: string;
    refresh_token?: string;
}

export interface GoogleRequest {
    token?: string;
}

export interface GoogleError {
    detail: string;
}

export interface LinkedinResponse {
    access_token?: string;
    refresh_token?: string;
}

export interface LinkedinRequest {
    token?: string;
}

export interface LinkedinError {
    detail: string;
}

export const googleApi = createApi({
    reducerPath: 'googleApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth`, credentials: "include" }),
    endpoints: (builder) => ({
        google: builder.mutation<GoogleResponse, GoogleRequest>({
            query: (body) => ({
                url: 'google',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const linkedinApi = createApi({
    reducerPath: 'linkedinApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth`, credentials: "include" }),
    endpoints: (builder) => ({
        linkedin: builder.mutation<LinkedinResponse, LinkedinRequest>({
            query: (body) => ({
                url: 'linkedin',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const { useGoogleMutation } = googleApi;
export const { useLinkedinMutation } = linkedinApi;
