'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusIcon, SaveIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import LinkForm from '@/app/(company)/company/overview/_components/form/link-form';
import { useUpdateCurrentCompanyMutation } from '@/app/(company)/company/_lib/slice';

type CreateLinkProps = {
  retrievedLinks: {
    id?: number;
    type?: string;
    url?: string;
  }[];
  refetch: () => void;
};

function CreateLink({ refetch, retrievedLinks }: CreateLinkProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateCurrentCompany, { data, isLoading, error }] = useUpdateCurrentCompanyMutation();

  const handleSubmit = async (linkType: string, linkUrl: string) => {
    try {
      await updateCurrentCompany({
        links: [
          ...retrievedLinks,
          {
            type: linkType,
            url: linkUrl,
          },
        ],
      }).unwrap();
      setDialogOpen(false);
      toast.success('Link created successfully.');
      refetch();
    } catch (err) {
      toast.error('Link creation failed.', { description: error?.toString() });
      return;
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          <span>Add new link</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Link</DialogTitle>
          <DialogDescription>Fill in the details below to create a new link.</DialogDescription>
        </DialogHeader>

        <LinkForm handleSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateLink;
