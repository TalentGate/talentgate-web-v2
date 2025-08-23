import Link from 'next/link';

import { Button } from '@/components/ui/button';
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

interface CtaGroupProps {
  formPage: number;
  setFormPage: Function;
}

const CtaGroup = ({ formPage, setFormPage }: CtaGroupProps) => {
  return (
    <section className="grid gap-4 mt-auto">
      {/* CONFIRM BUTTON */}
      {formPage === 4 && (
        <Button type="submit" className="w-full">
          Create Job Post
        </Button>
      )}

      {/* NEXT BUTTON */}
      {formPage !== 4 && (
        <Button
          type="submit"
          variant={'secondary'}
          className="w-full"
          onClick={() => {
            if (1 <= formPage && formPage <= 4) setFormPage(formPage + 1);
          }}
        >
          Next step
        </Button>
      )}

      {/* CANCEL BUTTON */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="w-full">
            Cancel
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogDescription>If you cancel, all your changes will be lost.</DialogDescription>
          <DialogFooter className="w-full">
            <Button variant={'destructive'} asChild>
              <Link href={'/jobs'}>Yes, I'm sure</Link>
            </Button>
            <DialogClose asChild>
              <Button variant={'ghost'}>No</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CtaGroup;
