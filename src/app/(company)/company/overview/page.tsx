'use client';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SaveIcon } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

import { LoginError } from '@/app/(auth)/login/_lib/slice';
import {
  UpdateCurrentCompanyRequest,
  RetrieveCurrentCompanyResponse,
  useUpdateCurrentCompanyMutation,
  useUploadCurrentCompanyLogoMutation,
  useRetrieveCurrentCompanyQuery,
} from '@/app/(company)/company/_lib/slice';
import Header from '@/components/section/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import CreateLink from '@/app/(company)/company/overview/_components/dialog/create-link';
import LinksTable from '@/app/(company)/company/overview/_components/table/links-table';
import LocationsTable from '@/app/(company)/company/overview/_components/table/locations-table';
import CreateLocation from '@/app/(company)/company/overview/_components/dialog/create-location';

const Company = () => {
  const {
    data: retrieveCurrentCompanyData,
    isLoading: retrieveCurrentCompanyLoading,
    error: retrieveCurrentCompanyError,
    refetch: retrieveCurrentCompany,
  } = useRetrieveCurrentCompanyQuery({});
  const [updateCurrentCompany, { isSuccess: isUpdateCurrentCompanySuccess }] =
    useUpdateCurrentCompanyMutation();
  const [uploadCurrentCompanyLogo, { isSuccess: isUploadCurrentCompanyLogoSuccess }] =
    useUploadCurrentCompanyLogoMutation();

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
      toast.error('Company can not be updated.', {
        description:
          ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
          'Something went wrong. Please try again later.',
      });
    }
  };

  React.useEffect(() => {
    toast.error('Company can not be retrieved.', {
      description:
        retrieveCurrentCompanyError?.toString() || 'Something went wrong. Please try again later.',
    });
  }, [retrieveCurrentCompanyError]);

  React.useEffect(() => {
    if (retrieveCurrentCompanyData) {
      const { name, overview }: RetrieveCurrentCompanyResponse = retrieveCurrentCompanyData;
      const updateData: UpdateCurrentCompanyRequest = { name, overview };
      setUpdateCurrentCompanyRequest(updateData);
    }
  }, [retrieveCurrentCompanyData]);

  React.useEffect(() => {
    if (isUpdateCurrentCompanySuccess) {
      try {
        retrieveCurrentCompany();
      } catch (err) {
        toast.error('Company can not be retrieved.', {
          description:
            ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
            'Something went wrong. Please try again later.',
        });
      }
    }
  }, [retrieveCurrentCompany, isUpdateCurrentCompanySuccess]);

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

  if (retrieveCurrentCompanyLoading) {
    return <Spinner className="size-10 h-full mx-auto col-span-2" />;
  }

  if (retrieveCurrentCompanyError) {
    return <p>Error loading company data.</p>;
  }

  return (
    <main className="p-6 space-y-6 h-full w-full">
      <Header header="Overview" description="You can modify your company information" />
      <Card>
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

      <Card>
        <div className="flex justify-between items-center pr-6">
          <CardHeader className="w-full">
            <CardTitle>Links</CardTitle>
            <CardDescription>
              Add, modify and delete links of your company from this card.
            </CardDescription>
          </CardHeader>
          <CreateLink
            retrievedLinks={retrieveCurrentCompanyData!.links!}
            refetch={retrieveCurrentCompany}
          />
        </div>

        <CardContent className="space-y-4">
          <LinksTable />
        </CardContent>
      </Card>

      <Card>
        <div className="flex justify-between items-center pr-6">
          <CardHeader className="w-full">
            <CardTitle>Locations</CardTitle>
            <CardDescription>
              Add, modify and delete locations of your company from this card.
            </CardDescription>
          </CardHeader>
          <CreateLocation
            retrievedLocations={retrieveCurrentCompanyData!.locations!}
            refetch={retrieveCurrentCompany}
          />
        </div>

        <CardContent className="space-y-4">
          <LocationsTable />
        </CardContent>
      </Card>
    </main>
  );
};

export default Company;
