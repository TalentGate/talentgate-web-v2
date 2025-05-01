"use client"

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
// import LoginButton from "./_components/button/login";
// import GoogleButton from "./_components/button/google";
// import LinkedinButton from "./_components/button/linkedin";
import { Button } from "@/components/ui/button";
// import {redirect} from "next/navigation";
import Link from "next/link";
import {LoginRequest, useLoginMutation} from "@/app/login/_lib/slice";
import {useState} from "react";
import EmailInput from "@/app/login/_components/input/email";
import PasswordInput from "@/app/login/_components/input/password";
import LoginButton from "@/app/login/_components/button/login";

export default function Login() {
    const [login, { data, isLoading, error }] = useLoginMutation();

    const [loginRequest, setLoginRequest] = useState<LoginRequest>({
        email: '',
        password: '',
    });

    const handleLoginRequestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(loginRequest).unwrap();
        } catch (err) {
            console.error('Failed to create post:', err);
        }
    };

    return (
        <main className="flex h-screen justify-center items-center">
            {loginRequest.email}
            {loginRequest.password}
            <Card className="rounded-3xl shadow-md p-5 w-96">
                <CardHeader className="flex items-center">
                    <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-5">
                    <EmailInput id="email" name="email" type="email" placeholder="Email" value={loginRequest.email} onChange={handleLoginRequestChange} className={"focus-visible:ring-transparent"} />
                    <PasswordInput id="password" name="password" type="password" placeholder="Password" value={loginRequest.password} onChange={handleLoginRequestChange} className={"focus-visible:ring-transparent"} />
                    <div className="grid grid-cols-2">
                        <div className="flex items-center space-x-2">
                            {/*<Checkbox id="terms" />*/}
                            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Remember me
                            </label>
                        </div>
                        <div className="flex justify-end">
                            <Button variant="link" className="p-0 h-auto underline decoration-transparent">
                                Forgot Password?
                            </Button>
                        </div>
                    </div>
                    <LoginButton id="login" name="login" variant="outline" onClick={handleLoginSubmit} />
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
                    {/*<GoogleButton id="google" variant="outline" onClick={handleGoogleSignIn} />*/}
                    {/*<LinkedinButton id="linkedin" variant="outline" onClick={handleLinkedinSignIn} />*/}
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                    <CardDescription className="flex flex-row justify-center items-center">
                        <span className="text-muted-foreground">{"Don't have an account?"}</span>
                        <Link href={"/register"}>
                            <Button variant="link" className="p-0 ml-1 underline decoration-transparent">
                                Register
                            </Button>
                        </Link>
                    </CardDescription>
                </CardFooter>
            </Card>
        </main>
    );
}