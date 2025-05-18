'use client';

import { redirect } from 'next/navigation';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import * as React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

import GoogleButton from "@/app/(auth)/_components/button/google";
import LinkedinButton from "@/app/(auth)/_components/button/linkedin";
import Login from '@/app/(auth)/register/_components/button/login';
import { RegisterError, RegisterRequest, useRegisterMutation } from '@/app/(auth)/register/_lib/slice';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import RegisterButton from './_components/button/register';
import EmailInput from './_components/input/email';
import FirstnameInput from './_components/input/firstname';
import LastnameInput from './_components/input/lastname';
import PasswordInput from './_components/input/password';
import UsernameInput from './_components/input/username';

export default function Register() {
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const [registerRequest, setRegisterRequest] = useState<RegisterRequest>({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const handleRegisterRequestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRegisterRequest({ ...registerRequest, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async () => {
    try {
      await register(registerRequest).unwrap();
    } catch (err) {
      toast.error('Authentication Failed', {
        description: ((err as FetchBaseQueryError)?.data as RegisterError)?.detail || 'Something went wrong. Please try again later.',
      });
    }
  };

  const handleLoginSubmit = async () => {
    redirect('/login');
  };

  return (
    <main className="flex h-screen justify-center items-center">
      <Card className="rounded-3xl shadow-md p-5 w-96">
        <CardHeader className="flex justify-center">
          <CardTitle className="text-2xl">
                        Register
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <FirstnameInput
              id="firstname"
              name="firstname"
              type="text"
              placeholder="Firstname"
              value={registerRequest.firstname}
              onChange={handleRegisterRequestChange}
              isLoading={isRegisterLoading}
              className="focus-visible:ring-transparent"
            />
            <LastnameInput
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Lastname"
              value={registerRequest.lastname}
              onChange={handleRegisterRequestChange}
              isLoading={isRegisterLoading}
              className="focus-visible:ring-transparent"
            />
          </div>
          <UsernameInput
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={registerRequest.username}
            onChange={handleRegisterRequestChange}
            isLoading={isRegisterLoading}
            className={'focus-visible:ring-transparent'}
          />
          <EmailInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={registerRequest.email}
            onChange={handleRegisterRequestChange}
            isLoading={isRegisterLoading}
            className={'focus-visible:ring-transparent'}
          />
          <PasswordInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={registerRequest.password}
            onChange={handleRegisterRequestChange}
            isLoading={isRegisterLoading}
            className={'focus-visible:ring-transparent'}
          />
          <RegisterButton
            id="register"
            name="login"
            variant="outline"
            onClick={handleRegisterSubmit}
            isLoading={isRegisterLoading}
          />
        </CardContent>
        <CardContent className="flex flex-col justify-center items-center">
        <CardDescription className="flex flex-row justify-center items-center">
          <span className="text-muted-foreground">{'Already have an account?'}</span>
          <Login id="register" name="register" variant="link" onClick={handleLoginSubmit} isLoading={isRegisterLoading} className="p-1"/>
        </CardDescription>
        </CardContent>
        <CardContent className="grid grid-cols-1 gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
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
