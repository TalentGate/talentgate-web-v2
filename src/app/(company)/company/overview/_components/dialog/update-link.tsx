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
import { Button } from '@/components/ui/button';
import { SaveIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useUpdateCurrentCompanyMutation } from '@/app/(company)/company/_lib/slice';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import LinkForm from '@/app/(company)/company/overview/_components/form/link-form';

type UpdateLinkProps = {
  retrievedLinks: {
    id?: number;
    type?: string;
    url?: string;
  }[];
  link: {
    id?: number;
    type?: string;
    url?: string;
  };
  refetch: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

function UpdateLink({ retrievedLinks, refetch, link, open, setOpen }: UpdateLinkProps) {
  const [updateCurrentCompany, { data, isLoading, error }] = useUpdateCurrentCompanyMutation();

  const handleSubmit = async (linkType: string, linkUrl: string, linkId?: number) => {
    if (!link?.id) return;

    retrievedLinks = retrievedLinks.filter((curLink) => link.id !== curLink.id);

    try {
      await updateCurrentCompany({
        links: [
          ...retrievedLinks,
          {
            id: linkId,
            type: linkType,
            url: linkUrl,
          },
        ],
      }).unwrap();

      setOpen(false);

      toast.success('Link updated successfully.');

      refetch();
    } catch (err) {
      toast.error('Link update failed.', { description: error?.toString() });
      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Link: {link.type}</DialogTitle>
          <DialogDescription>Update an existing link via this modal.</DialogDescription>
        </DialogHeader>

        <LinkForm link={link} handleSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}

export default UpdateLink;
