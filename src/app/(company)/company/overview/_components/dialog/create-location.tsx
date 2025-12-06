'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import LocationForm from '@/app/(company)/company/overview/_components/form/location-form';
import { useUpdateCurrentCompanyMutation } from '@/app/(company)/company/_lib/slice';

type Location = {
  id?: number;
  type?: string;
  latitude?: string;
  longitude?: string;
  address?: {
    id?: number;
    unit?: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
  };
};

type CreateLocationProps = {
  retrievedLocations: Location[];
  refetch: () => void;
};

function CreateLocation({ refetch, retrievedLocations }: CreateLocationProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateCurrentCompany, { data, isLoading, error }] = useUpdateCurrentCompanyMutation();

  const handleSubmit = async (location: Location) => {
    try {
      await updateCurrentCompany({
        locations: [...retrievedLocations, location],
      }).unwrap();
      setDialogOpen(false);
      toast.success('Location created successfully.');
      refetch();
    } catch (err) {
      toast.error('Location creation failed.', { description: error?.toString() });
      return;
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          <span>Add new location</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Location</DialogTitle>
          <DialogDescription>Fill in the details below to create a new location.</DialogDescription>
        </DialogHeader>

        <LocationForm handleSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateLocation;
