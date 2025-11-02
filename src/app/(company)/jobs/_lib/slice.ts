import {createApi} from '@reduxjs/toolkit/query/react';

import {baseQueryWithReauth} from '@/app/api/baseQuery';

export interface RetrieveCompanyJobResponse {
    id: number;
    title: string;
    department: string;
    employment_type: string;
    job_post_deadline: string;
    company_id: number;
    created_at: number;
    updated_at: number;
    location: {
        id: number;
        unit: string;
        street: string;
        city: string;
        state: string;
        country: string;
        postal_code: string;
        type?: string; // TODO
    };
    total_applicants?: number; // TODO
    salary: {
        min?: number;
        max?: number;
        frequency?: string;
    } // TODO
}

export interface RetrieveCompanyJobsParams {
    offset?: string;
    limit?: string;
    title?: string;
    employment_type?: string;
    location_type?: string;
    department?: string;
}

export interface RetrieveCompanyJobsError {
    detail: string;
}

export const companyJobsApi = createApi({
    reducerPath: 'companyJobsApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        retrieveCompanyJobs: builder.query<RetrieveCompanyJobResponse[], RetrieveCompanyJobsParams>({
            query: ({
                        title,
                        employment_type,
                        location_type,
                        department,
                        offset = 0,
                        limit = 10
                    }) => {
                const searchParams = new URLSearchParams();
                searchParams.append('offset', offset.toString());
                searchParams.append('limit', limit.toString());
                if (title) searchParams.append('title', title);
                if (employment_type) searchParams.append('employment_type', employment_type);
                if (location_type) searchParams.append('location_type', location_type);
                if (department) searchParams.append('department', department);

                return (
                    {
                        url: `/me/company/jobs?${searchParams}`,
                        method: 'GET',
                    }
                )
            },
        }),
    }),
});

export const {
    useRetrieveCompanyJobsQuery
} = companyJobsApi;
