'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React from 'react';
import { useUpdateCurrentCompanyMutation } from '@/app/(company)/company/_lib/slice';
import { toast } from 'sonner';
import LocationForm from '@/app/(company)/company/overview/_components/form/location-form';

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

type UpdateLocationProps = {
  retrievedLocations: Location[];
  location: Location;
  refetch: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

function UpdateLocation({
  retrievedLocations,
  refetch,
  location,
  open,
  setOpen,
}: UpdateLocationProps) {
  const [updateCurrentCompany, { data, isLoading, error }] = useUpdateCurrentCompanyMutation();

  const handleSubmit = async (location: Location) => {
    if (!location?.id) return;

    retrievedLocations = retrievedLocations.filter((curLocation) => location.id !== curLocation.id);

    try {
      await updateCurrentCompany({
        locations: [...retrievedLocations, location],
      }).unwrap();

      setOpen(false);

      toast.success('Location updated successfully.');

      refetch();
    } catch (err) {
      toast.error('Location update failed.', { description: error?.toString() });
      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Location: {location.type}</DialogTitle>
          <DialogDescription>Update an existing Location via this modal.</DialogDescription>
        </DialogHeader>

        <LocationForm location={location} handleSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}

export default UpdateLocation;
