'use client';

import { useRouter } from 'next/navigation';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import * as React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

import EmailInput from '@/app/(auth)/login/_components/input/email';
import { LoginRequest, useLoginMutation } from '@/app/(auth)/login/_lib/slice';
import LoginButton from '@/app/(auth)/password/forgot/_components/button/login';
import Login from '@/app/(auth)/register/_components/button/login';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ForgotPassword() {
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const router = useRouter();

  const [loginRequest, setLoginRequest] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const handleLoginRequestChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async () => {
    router.push('/login');
  };

  return (
    <main className="flex h-screen justify-center items-center">
      <Card className="rounded-3xl shadow-md p-5 w-96">
        <CardHeader className="flex flex-col justify-center items-center">
          <CardTitle className="text-2xl text-center">Forgot Password</CardTitle>
          <CardDescription className="text-xl text-center justify-center items-center">
            {
              "Enter your registered email address and we'll send you a link to reset your password securely."
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          <EmailInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={loginRequest.email}
            onChange={handleLoginRequestChange}
            isLoading={isLoginLoading}
            className={'focus-visible:ring-transparent'}
          />
          <LoginButton
            id="login"
            name="login"
            variant="outline"
            onClick={handleLoginSubmit}
            isLoading={isLoginLoading}
          />
        </CardContent>
        <CardContent>
          <CardDescription className="flex flex-row justify-center items-center">
            <span className="text-muted-foreground">{'Remember your password?'}</span>
            <Login
              id="register"
              name="register"
              variant="link"
              onClick={handleLoginSubmit}
              className="p-1"
            />
          </CardDescription>
        </CardContent>
      </Card>
    </main>
  );
}
