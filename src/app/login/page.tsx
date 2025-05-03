"use client"

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {LoginError, LoginRequest, useLoginMutation} from "@/app/login/_lib/slice";
import {useState} from "react";
import EmailInput from "@/app/login/_components/input/email";
import PasswordInput from "@/app/login/_components/input/password";
import LoginButton from "@/app/login/_components/button/login";
import { toast } from "sonner";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import GoogleButton from "@/app/login/_components/button/google";
import LinkedinButton from "@/app/login/_components/button/linkedin";
import ForgotPasswordButton from "@/app/login/_components/button/password";
import Register from "@/app/login/_components/button/register";
import { redirect } from "next/navigation";

export default function Login() {
    const [login, { isLoading: isLoginLoading }] = useLoginMutation();

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
            toast.error("Authentication Failed", {
                description: ((err as FetchBaseQueryError)?.data as LoginError)?.detail || "Something went wrong. Please try again later.",
            })
        }
    };

    const handleForgotPasswordSubmit = async () => {
        redirect("/reset-password");
    };

    const handleRegisterSubmit = async () => {
        redirect("/register");
    };

    return (
        <main className="flex h-screen justify-center items-center">
            <Card className="rounded-3xl shadow-md p-5 w-96">
                <CardHeader className="flex justify-center">
                    <CardTitle className="text-2xl">
                        Login
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4">
                    <EmailInput id="email" name="email" type="email" placeholder="Email" value={loginRequest.email} onChange={handleLoginRequestChange} isLoading={isLoginLoading} className={"focus-visible:ring-transparent"} />
                    <PasswordInput id="password" name="password" type="password" placeholder="Password" value={loginRequest.password} onChange={handleLoginRequestChange} isLoading={isLoginLoading} className={"focus-visible:ring-transparent"} />
                    <LoginButton id="login" name="login" variant="outline" onClick={handleLoginSubmit} isLoading={isLoginLoading}/>
                </CardContent>
                <CardContent className="flex flex-col items-center">
                    <CardDescription className="flex flex-row justify-center items-center">
                        <ForgotPasswordButton id="forgot-password" name="forgot-password" variant="link" onClick={handleForgotPasswordSubmit} isLoading={isLoginLoading}/>
                    </CardDescription>
                    <CardDescription className="flex flex-row justify-center items-center">
                        <span className="text-muted-foreground">{"Don't have an account?"}</span>
                        <Register id="register" name="register" variant="link" onClick={handleRegisterSubmit} isLoading={isLoginLoading} className="p-1"/>
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
                    <GoogleButton id="google" name="google" variant="outline" />
                    <LinkedinButton id="linkedin" name="google" variant="outline" />
                </CardContent>
            </Card>
        </main>
    );
}