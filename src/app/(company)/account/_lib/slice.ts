import { createApi } from '@reduxjs/toolkit/query/react';

import {baseQueryWithReauth} from "@/app/api/baseQuery";

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
    firstname: string;
    lastname: string;
    email: string;}

export interface UpdateCurrentUserError {
    detail: string;
}

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
        updateCurrentUser: builder.mutation<UpdateCurrentUserResponse, UpdateCurrentUserRequest>({
            query: (body) => ({
                url: '/me',
                method: 'POST',
                body: body
            }),
        }),
    }),
});

export const { useRetrieveCurrentUserMutation, useUpdateCurrentUserMutation } = usersApi;
