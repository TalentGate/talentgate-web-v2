import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { SaveIcon } from 'lucide-react';

type ModifyLinkProps = {
  link?: {
    id?: number;
    type?: string;
    url?: string;
  };
  isLoading: boolean;
  handleSubmit: (linkType: string, linkUrl: string, linkId?: number) => void;
};

function LinkForm({ link, isLoading, handleSubmit }: ModifyLinkProps) {
  const [currentLink, setCurrentLink] = useState<{
    id?: undefined | number;
    type?: undefined | string;
    url?: undefined | string;
  }>(
    link ?? {
      id: undefined,
      type: '',
      url: '',
    }
  );

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLink({
      ...currentLink,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <section className="space-y-4">
        <div className="space-y-2">
          <Label>Type</Label>
          <Input
            name="type"
            placeholder="Type"
            value={currentLink.type}
            onChange={handleLinkChange}
          />
        </div>
        <div className="space-y-2">
          <Label>URL</Label>
          <Input name="url" placeholder="URL" value={currentLink.url} onChange={handleLinkChange} />
        </div>
      </section>

      <DialogFooter>
        <Button
          disabled={isLoading}
          onClick={() => {
            handleSubmit(
              currentLink.type || '',
              currentLink.url || '',
              currentLink.id || undefined
            );
          }}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <SaveIcon />
              <span>Save Changes</span>
            </>
          )}
        </Button>
        <DialogClose>Cancel</DialogClose>
      </DialogFooter>
    </>
  );
}

export default LinkForm;
