'use client';

import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import { SaveIcon } from "lucide-react";
import {useState} from "react";
import * as React from "react";
import {toast} from "sonner";

import {LoginError} from "@/app/(auth)/login/_lib/slice";
import {
  RetrieveCurrentUserResponse, UpdateCurrentUserRequest,
  useRetrieveCurrentUserMutation
} from "@/app/(company)/account/_lib/slice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";




const AccountInformation = () => {
  const [retrieveCurrentUser, { data: retrieveCurrentUserData, isLoading: isRetrieveCurrentUserLoading, isSuccess: isRetrieveCurrentUserSuccess }] = useRetrieveCurrentUserMutation();

  React.useEffect(() => {
    try {
      retrieveCurrentUser({}).unwrap();
    } catch (err) {
      toast.error('Authentication Failed', {
        description: ((err as FetchBaseQueryError)?.data as LoginError)?.detail || 'Something went wrong. Please try again later.',
      });
    }
  }, [retrieveCurrentUser]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col w-fit gap-4">
          <Avatar className="size-36">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Button variant={"secondary"}>Select photo</Button>
        </div>

        <div className="grid gap-4 grid-cols-2">
          <div className="space-y-2">
            <Label>Firstname</Label>
            <Input value={retrieveCurrentUserData?.firstname} placeholder="First Name" />
          </div>

          <div className="space-y-2">
            <Label>Lastname</Label>
            <Input value={retrieveCurrentUserData?.lastname} placeholder="Last Name" />
          </div>

          <div className="space-y-2">
            <Label>Username</Label>
            <Input value={retrieveCurrentUserData?.username} placeholder="Username" />
          </div>

          <div className="space-y-2 col-span-2">
            <Label>Email</Label>
            <Input value={retrieveCurrentUserData?.email} placeholder="Email" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="h-fit w-full space-x-4">
        <Button className="h-fit">
          <SaveIcon />
          <span>Save Changes</span>
        </Button>
        <Button variant={"outline"} className="h-full">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountInformation;
