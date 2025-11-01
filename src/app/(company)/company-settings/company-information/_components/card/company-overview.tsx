'use client';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SaveIcon } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

import { LoginError } from '@/app/(auth)/login/_lib/slice';
import {
  UpdateCurrentCompanyRequest,
  useRetrieveCurrentCompanyLogoMutation,
  useRetrieveCurrentCompanyMutation,
  useUpdateCurrentCompanyMutation,
  useUploadCurrentCompanyLogoMutation,
} from '@/app/(company)/company-settings/_lib/slice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateCurrentUserMutation } from '@/app/(company)/account/_lib/slice';

const CompanyOverview = () => {
  const [
    retrieveCurrentCompany,
    {
      data: retrieveCurrentCompanyData,
      isLoading: isRetrieveCurrentCompanyLoading,
      isSuccess: isRetrieveCurrentCompanySuccess,
    },
  ] = useRetrieveCurrentCompanyMutation();
  const [
    retrieveCurrentCompanyLogo,
    {
      data: retrieveCurrentCompanyLogoData,
      isLoading: isRetrieveCurrentCompanyLogoLoading,
      isSuccess: isRetrieveCurrentCompanyLogoSuccess,
    },
  ] = useRetrieveCurrentCompanyLogoMutation();
  const [
    updateCurrentCompany,
    {
      data: updateCurrentCompanyData,
      isLoading: isUpdateCurrentCompanyLoading,
      isSuccess: isUpdateCurrentCompanySuccess,
    },
  ] = useUpdateCurrentCompanyMutation();
  const [
    uploadCurrentCompanyLogo,
    {
      data: uploadCurrentCompanyLogoData,
      isLoading: isUploadCurrentCompanyLogoLoading,
      isSuccess: isUploadCurrentCompanyLogoSuccess,
    },
  ] = useUploadCurrentCompanyLogoMutation();

  const [updateCurrentCompanyRequest, setUpdateCurrentCompanyRequest] =
    useState<UpdateCurrentCompanyRequest>({
      name: '',
      overview: '',
    });

  const handleUpdateCurrentCompanyRequestChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdateCurrentCompanyRequest({
      ...updateCurrentCompanyRequest,
      [e.target.name]: e.target.value,
    });
  };

  const [logoImage, setLogoImage] = useState(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/me/company/logo`
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await uploadCurrentCompanyLogo(file).unwrap();
  };

  const handleUpdateCurrentCompanySubmit = async () => {
    try {
      await updateCurrentCompany(updateCurrentCompanyRequest).unwrap();
      toast.success('Company Updated', {
        description: 'Your company has been successfully updated.',
      });
    } catch (err) {
      toast.error('Company can not be updated', {
        description:
          ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
          'Something went wrong. Please try again later.',
      });
    }
  };

  React.useEffect(() => {
    try {
      retrieveCurrentCompany({}).unwrap();
    } catch (err) {
      toast.error('Retrieve Current Company Failed', {
        description:
          ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
          'Something went wrong. Please try again later.',
      });
    }
  }, [retrieveCurrentCompany]);

  React.useEffect(() => {
    if (retrieveCurrentCompanyData) {
      const { name, overview }: UpdateCurrentCompanyRequest = retrieveCurrentCompanyData;
      const updateData: UpdateCurrentCompanyRequest = { name, overview };
      setUpdateCurrentCompanyRequest(updateData);
    }
  }, [retrieveCurrentCompanyData]);

  React.useEffect(() => {
    if (isUploadCurrentCompanyLogoSuccess) {
      try {
        setLogoImage(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/me/company/logo#${Date.now()}`
        );
        toast.success('Company Logo Updated', {
          description: 'Your company logo has been successfully updated.',
        });
      } catch (err) {
        toast.error('Retrieve Current User Failed', {
          description:
            ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
            'Something went wrong. Please try again later.',
        });
      }
    }
  }, [setLogoImage, isUploadCurrentCompanyLogoSuccess]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col w-fit gap-4">
          <Avatar className="size-36">
            <AvatarImage src={logoImage} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Input
            name="profile"
            type="file"
            placeholder="Logo"
            onChange={handleFileChange}
            accept="image/*"
            className="focus-visible:ring-transparent"
          />
        </div>

        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            name="name"
            value={updateCurrentCompanyRequest?.name}
            placeholder="Name"
            onChange={handleUpdateCurrentCompanyRequestChange}
            className="focus-visible:ring-transparent"
          />
        </div>

        <div className="space-y-2">
          <Label>Overview</Label>
          <Textarea
            name="overview"
            value={updateCurrentCompanyRequest?.overview || ''}
            placeholder="Overview"
            onChange={handleUpdateCurrentCompanyRequestChange}
            className="focus-visible:ring-transparent"
          />
        </div>
      </CardContent>
      <CardFooter className="h-fit w-full space-x-4">
        <Button className="h-fit" onClick={handleUpdateCurrentCompanySubmit}>
          <SaveIcon />
          <span>Save Changes</span>
        </Button>
        <Button variant={'outline'} className="h-full">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyOverview;
