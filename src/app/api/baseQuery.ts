import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query';
import { signOut } from 'next-auth/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
});

let refreshPromise: Promise<
  QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
> | null = null;

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!refreshPromise) {
      refreshPromise = Promise.resolve(
        baseQuery(
          {
            url: '/auth/token/refresh',
            method: 'POST',
            credentials: 'include',
            body: {},
          },
          api,
          extraOptions
        )
      );
    }

    const refreshResult = await refreshPromise;
    refreshPromise = null;

    if (refreshResult?.data) {
      console.info('Token refresh successful. Retrying original request...');

      await new Promise((r) => setTimeout(r, 200));

      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error('Token refresh failed. Logging out...');

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

  return result;
};
