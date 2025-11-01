'use client';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SaveIcon } from 'lucide-react';
import { useState } from 'react';
import * as React from 'react';
import { toast } from 'sonner';

import { LoginError } from '@/app/(auth)/login/_lib/slice';
import {
  UpdateCurrentUserRequest,
  useRetrieveCurrentUserMutation,
  useRetrieveCurrentUserProfileMutation,
  useUpdateCurrentUserMutation,
  useUploadCurrentUserProfileMutation,
} from '@/app/(company)/account/_lib/slice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AccountInformation = () => {
  const [
    retrieveCurrentUser,
    {
      data: retrieveCurrentUserData,
      isLoading: isRetrieveCurrentUserLoading,
      isSuccess: isRetrieveCurrentUserSuccess,
    },
  ] = useRetrieveCurrentUserMutation();
  const [
    retrieveCurrentUserProfile,
    {
      data: retrieveCurrentUserProfileData,
      isLoading: isRetrieveCurrentUserProfileLoading,
      isSuccess: isRetrieveCurrentUserProfileSuccess,
    },
  ] = useRetrieveCurrentUserProfileMutation();
  const [
    updateCurrentUser,
    {
      data: updateCurrentUserData,
      isLoading: isUpdateCurrentUserLoading,
      isSuccess: isUpdateCurrentUserSuccess,
    },
  ] = useUpdateCurrentUserMutation();
  const [
    uploadCurrentUserProfile,
    {
      data: uploadCurrentUserProfileData,
      isLoading: isUploadCurrentUserProfileLoading,
      isSuccess: isUploadCurrentUserProfileSuccess,
    },
  ] = useUploadCurrentUserProfileMutation();

  const [profileImage, setProfileImage] = useState(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/me/profile`
  );
  const [updateCurrentUserRequest, setUpdateCurrentUserRequest] =
    useState<UpdateCurrentUserRequest>({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
    });
  const handleUpdateCurrentUserRequestChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdateCurrentUserRequest({
      ...updateCurrentUserRequest,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await uploadCurrentUserProfile(file).unwrap();
  };

  const handleUpdateCurrentUserSubmit = async () => {
    try {
      await updateCurrentUser(updateCurrentUserRequest).unwrap();
      toast.success('Profile Updated', {
        description: 'Your profile has been successfully updated.',
      });
    } catch (err) {
      toast.error('Profile can not be updated', {
        description:
          ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
          'Something went wrong. Please try again later.',
      });
    }
  };

  React.useEffect(() => {
    try {
      retrieveCurrentUser({}).unwrap();
    } catch (err) {
      toast.error('Retrieve Current User Failed', {
        description:
          ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
          'Something went wrong. Please try again later.',
      });
    }
  }, [retrieveCurrentUser]);

  React.useEffect(() => {
    if (retrieveCurrentUserData) {
      const { firstname, lastname, username, email }: UpdateCurrentUserRequest =
        retrieveCurrentUserData;
      const updateData: UpdateCurrentUserRequest = {
        firstname,
        lastname,
        username,
        email,
      };
      setUpdateCurrentUserRequest(updateData);
    }
  }, [retrieveCurrentUserData]);

  React.useEffect(() => {
    if (isUpdateCurrentUserSuccess) {
      try {
        retrieveCurrentUser({}).unwrap();
      } catch (err) {
        toast.error('Retrieve Current User Failed', {
          description:
            ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
            'Something went wrong. Please try again later.',
        });
      }
    }
  }, [retrieveCurrentUser, isUpdateCurrentUserSuccess]);

  React.useEffect(() => {
    if (isUploadCurrentUserProfileSuccess) {
      try {
        setProfileImage(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/me/profile#${Date.now()}`);
        toast.success('Profile Image Updated', {
          description: 'Your profile image has been successfully updated.',
        });
      } catch (err) {
        toast.error('Retrieve Current User Failed', {
          description:
            ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
            'Something went wrong. Please try again later.',
        });
      }
    }
  }, [setProfileImage, isUploadCurrentUserProfileSuccess]);

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex flex-col w-fit gap-4">
          <Avatar className="size-36">
            <AvatarImage src={profileImage} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Input
            name="profile"
            type="file"
            placeholder="Photo"
            onChange={handleFileChange}
            accept="image/*"
            className="focus-visible:ring-transparent"
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Firstname</Label>
              <Input
                name="firstname"
                value={updateCurrentUserRequest?.firstname}
                placeholder="Firstname"
                onChange={handleUpdateCurrentUserRequestChange}
                className="focus-visible:ring-transparent"
              />
            </div>

            <div className="space-y-2">
              <Label>Lastname</Label>
              <Input
                name="lastname"
                value={updateCurrentUserRequest?.lastname}
                placeholder="Lastname"
                onChange={handleUpdateCurrentUserRequestChange}
                className="focus-visible:ring-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Username</Label>
            <Input
              name="username"
              value={updateCurrentUserRequest?.username}
              placeholder="Username"
              onChange={handleUpdateCurrentUserRequestChange}
              className="focus-visible:ring-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              name="email"
              value={updateCurrentUserRequest?.email}
              placeholder="Email"
              onChange={handleUpdateCurrentUserRequestChange}
              className="focus-visible:ring-transparent"
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="h-fit w-full space-x-4">
        <Button className="h-fit" onClick={handleUpdateCurrentUserSubmit}>
          <SaveIcon />
          <span>Save Changes</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountInformation;
