import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '@/app/api/baseQuery';

export interface RetrieveCompanyJobResponse {
  company_id: number;
  id: number;
  title: string;
  description: string;
  department: string;
  employment_type: string;
  job_post_deadline: string;
  location: {
    id: number;
    unit: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    type?: string; // TODO
    latitude?: number; // TODO
    longitude?: number; // TODO
  };
  total_applicants?: number; // TODO
  salary: {
    min?: number;
    max?: number;
    frequency?: string;
  }; // TODO
  created_at: number;
  updated_at: number;
}

export interface RetrieveCompanyJobParams {
  company_id: number;
  job_id: number;
}

export interface RetrieveCompanyJobsParams {
  company_id: number;
  offset?: string;
  limit?: string;
  title?: string;
  employment_type?: string[];
  location_type?: string[];
  departments?: string[];
}

export interface RetrieveCompanyJobsError {
  detail: string;
}

export interface CreateCompanyJobRequest {
  title: string;
  description: string;
  department: string;
  employment_type: string;
  job_post_deadline: string;
  company_id: number; // TODO: Remove once company job implemented
  location: {
    address: {
      unit: string;
      street: string;
      city: string;
      state: string;
      country: string;
      postal_code: string;
    }
    type: string;
    latitude: number;
    longitude: number;
  };
  salary: {
    min: number;
    max: number;
    frequency: string;
  };
}

export interface CreateCompanyJobResponse {
  id: number;
  title: string;
  department: string;
  employment_type: string;
  job_post_deadline: string;
  company_id: number;
  created_at: number;
  updated_at: number;
}

export interface UpdateCompanyJobRequest {
  title: string;
  description: string;
  department: string;
  employment_type: string;
  job_post_deadline: string;
  location: {
    address: {
      unit: string;
      street: string;
      city: string;
      state: string;
      country: string;
      postal_code: string;
    }
    type: string;
    latitude: number;
    longitude: number;
  };
  salary: {
    min: number;
    max: number;
    frequency: string;
  };
}

export interface UpdateCompanyJobResponse {
  id: number;
  title: string;
  department: string;
  employment_type: string;
  job_post_deadline: string;
  company_id: number;
  created_at: number;
  updated_at: number;
}

export interface DeleteCompanyJobResponse {
  id: number;
  title: string;
  department: string;
  employment_type: string;
  job_post_deadline: string;
  company_id: number;
  created_at: number;
  updated_at: number;
}

export interface DeleteCompanyJobParams {
  id: number;
}

export const companyJobsApi = createApi({
  reducerPath: 'companyJobsApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    retrieveCompanyJob: builder.query<RetrieveCompanyJobResponse, RetrieveCompanyJobParams>({
      query: ({ company_id, job_id }) => ({
        url: `/careers/companies/${company_id}/jobs/${job_id}`,
        // url: `/me/company/jobs/${job_id}`,
        method: 'GET',
      }),
    }),
    retrieveCompanyJobs: builder.query<RetrieveCompanyJobResponse[], RetrieveCompanyJobsParams>({
      query: ({
                company_id,
                title,
                employment_type,
                location_type,
                departments,
                offset = 0,
                limit = 10,
              }) => {
        const searchParams = new URLSearchParams();
        searchParams.append('offset', offset.toString());
        searchParams.append('limit', limit.toString());
        if (title) searchParams.append('title', title);
        if (employment_type) {
          employment_type.forEach((type) => {
            searchParams.append('employment_type', type);
          });
        }
        if (location_type) {
          location_type.forEach((type) => {
            searchParams.append('location_type', type);
          });
        }
        if (departments) {
          departments.forEach((type) => {
            searchParams.append('department', type);
          });
        }

        return {
          url: `/careers/companies/${company_id}/jobs?${searchParams}`,
          // url: `/me/company/jobs?${searchParams}`,
          method: 'GET',
        };
      },
    }),
    createCompanyJob: builder.mutation<CreateCompanyJobResponse, CreateCompanyJobRequest>({
      query: (body) => ({
        // url: '/me/company/jobs',
        url: '/jobs',
        method: 'POST',
        body,
      }),
    }),
    updateCompanyJob: builder.mutation<UpdateCompanyJobResponse, { id: number; body: UpdateCompanyJobRequest }>({
      query: ({ id, body }) => ({
        // url: `/me/company/jobs/${id}`,
        url: `/jobs/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteCompanyJob: builder.mutation<DeleteCompanyJobResponse, DeleteCompanyJobParams>({
      query: ({ id }) => ({
        url: `/jobs/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useRetrieveCompanyJobQuery,
  useRetrieveCompanyJobsQuery,
  useCreateCompanyJobMutation,
  useUpdateCompanyJobMutation,
  useDeleteCompanyJobMutation,
} = companyJobsApi;
