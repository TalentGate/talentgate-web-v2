'use client';

import { redirect } from 'next/navigation';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';


import GoogleButton from '@/app/(auth)/_components/button/google';
import LinkedinButton from '@/app/(auth)/_components/button/linkedin';
import { useGoogleMutation } from '@/app/(auth)/_lib/slice';
import LoginButton from '@/app/(auth)/login/_components/button/login';
import ForgotPasswordButton from '@/app/(auth)/login/_components/button/password';
import Register from '@/app/(auth)/login/_components/button/register';
import EmailInput from '@/app/(auth)/login/_components/input/email';
import PasswordInput from '@/app/(auth)/login/_components/input/password';
import { LoginError, LoginRequest, useLoginMutation } from '@/app/(auth)/login/_lib/slice';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

import type { Session } from "next-auth";

export default function Login() {
  const { data: session } = useSession() as { data: Session | null };
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [google] = useGoogleMutation();

  const [loginRequest, setLoginRequest] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const handleLoginRequestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async () => {
    try {
      await login(loginRequest).unwrap();
    } catch (err) {
      toast.error('Authentication Failed', {
        description: ((err as FetchBaseQueryError)?.data as LoginError)?.detail || 'Something went wrong. Please try again later.',
      });
    }
  };

  const handleForgotPasswordSubmit = async () => {
    redirect('/password/forgot');
  };

  const handleRegisterSubmit = async () => {
    redirect('/register');
  };

  React.useEffect(() => {
    if (session?.idToken) {
      google({token: session.idToken}).unwrap();
    }
  }, [google, session]);

  return (
    <main className="flex h-screen justify-center items-center">
      { session?.idToken }
      <Card className="rounded-3xl shadow-md p-5 w-96">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="text-2xl text-center">
                        Login
          </CardTitle>
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
          <PasswordInput
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={loginRequest.password}
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
        <CardContent className="flex flex-col justify-center items-center">
          <CardDescription className="flex flex-row justify-center items-center">
            <ForgotPasswordButton
                id="forgot-password"
                name="forgot-password"
                variant="link"
                onClick={handleForgotPasswordSubmit}
                isLoading={isLoginLoading}
            />
          </CardDescription>
          <CardDescription className="flex flex-row justify-center items-center">
            <span className="text-muted-foreground">
              {"Don't have an account?"}
            </span>
            <Register
                id="register"
                name="register"
                variant="link"
                onClick={handleRegisterSubmit}
                isLoading={isLoginLoading}
                className="pl-1"
            />
          </CardDescription>
        </CardContent>
        <CardContent className="grid grid-cols-1 gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex justify-center items-center">
              <span className="w-full border-t" />
            </div>
            <div className="flex text-xs relative justify-center items-center">
              <span className="bg-background px-5 text-muted-foreground">
                OR
              </span>
            </div>
          </div>
        </CardContent>
        <CardContent className="grid grid-cols-1 gap-4">
          <GoogleButton
              id="google"
              name="google"
              variant="outline"
          />
          <LinkedinButton
              id="linkedin"
              name="google"
              variant="outline"
          />
        </CardContent>
      </Card>
    </main>
  );
}
