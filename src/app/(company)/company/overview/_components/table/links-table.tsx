import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useRetrieveCurrentCompanyQuery,
  useUpdateCurrentCompanyMutation,
} from '@/app/(company)/company/_lib/slice';
import { Button } from '@/components/ui/button';
import { EditIcon, MoreHorizontal, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UpdateLink from '@/app/(company)/company/overview/_components/dialog/update-link';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

type MoreDropdownMenuProps = {
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
};

const MoreDropdownMenu = ({ retrievedLinks, link, refetch }: MoreDropdownMenuProps) => {
  const [updateCurrentCompany, { data, isLoading, error }] = useUpdateCurrentCompanyMutation();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleDialogOpenChange = () => {
    if (dropdownOpen) {
      setDropdownOpen(false);
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
    }
  };

  const handleDelete = async () => {
    try {
      await updateCurrentCompany({
        links: retrievedLinks.filter((l) => l.id !== link.id),
      });
      toast.success('Link deleted successfully.');
      refetch();
    } catch (err) {
      toast.error('Link could not be deleted.');
      return;
    }
  };

  return (
    <div className="text-right">
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDialogOpenChange}>
            <EditIcon />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            <TrashIcon />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateLink
        retrievedLinks={retrievedLinks}
        link={link}
        refetch={refetch}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
    </div>
  );
};

function LinksTable() {
  const { data, refetch, isLoading, error } = useRetrieveCurrentCompanyQuery({});

  useEffect(() => {
    if (error) {
      toast.error('Error loading links.');
    }
  }, [error]);

  if (isLoading) {
    return <Spinner className="size-10 h-full mx-auto col-span-2" />;
  }

  if (error) {
    return <div>Error loading links.</div>;
  }

  return (
    <div className="bg-background rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>URL</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.links?.map((link) => (
            <TableRow key={link.id}>
              <TableCell className="p-4">{link.id}</TableCell>
              <TableCell className="p-4">{link.type}</TableCell>
              <TableCell className="p-4">{link.url}</TableCell>
              <TableCell className="text-right">
                <MoreDropdownMenu retrievedLinks={data!.links!} link={link} refetch={refetch} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default LinksTable;
