import { BaseQueryApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {signOut} from "next-auth/react";

export const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    const baseQuery = fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })

    let result = await baseQuery(args, api, extraOptions);

    // if (result.error?.status === 403) {
    //     const refreshResult = await baseQuery('/auth/token/refresh', api, extraOptions);
    //
    //     if (refreshResult.data) {
    //         result = await baseQuery(args, api, extraOptions);
    //     } else {
    //         await baseQuery('/auth/logout', api, extraOptions);
    //         signOut({callbackUrl: '/login'});
    //     }
    // }

    return result;
}
