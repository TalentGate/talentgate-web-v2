'use client';

import Link from 'next/link';

import { SaveIcon, UserPlus } from 'lucide-react';

import * as React from 'react';
import { useAcceptEmployeeInvitationMutation } from '@/app/(company)/company/_lib/slice';
import { toast } from 'sonner';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { LoginError } from '@/app/(auth)/login/_lib/slice';
import { useSearchParams } from 'next/navigation';

const EmployeesInvitation = () => {
  const searchParams = useSearchParams();
  const [acceptEmployeeInvitation, { data: acceptEmployeeInvitationData }] =
    useAcceptEmployeeInvitationMutation();

  React.useEffect(() => {
    try {
      acceptEmployeeInvitation({ token: searchParams.get('token') }).unwrap();
    } catch (err) {
      toast.error('Company can not be retrieved.', {
        description:
          ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
          'Something went wrong. Please try again later.',
      });
    }
  }, [acceptEmployeeInvitation]);

  return <main className="p-6 space-y-6 h-full w-full"></main>;
};

export default EmployeesInvitation;
