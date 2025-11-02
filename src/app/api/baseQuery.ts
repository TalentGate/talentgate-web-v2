import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { signOut } from 'next-auth/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // ensures cookies (access + refresh) are sent
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions); // ✅ use let, not const

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: '/auth/token/refresh',
        method: 'POST',
        credentials: 'include',
        body: {}, // some backends require non-empty body
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {

      try {
        await baseQuery(
          {
            url: '/auth/logout',
            method: 'POST',
            credentials: 'include',
            body: {},
          },
          api,
          extraOptions
        );
      } catch (err) {
        console.warn('Logout request failed or user already logged out.', err);
      }

      await signOut({ callbackUrl: '/login' });
    }
  }

  return result; // ✅ always return final result (after refresh or logout)
};
