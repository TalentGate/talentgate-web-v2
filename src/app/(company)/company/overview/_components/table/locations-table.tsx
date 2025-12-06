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
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import UpdateLocation from '@/app/(company)/company/overview/_components/dialog/update-location';

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

type MoreDropdownMenuProps = {
  retrievedLocations: Location[];
  location: Location;
  refetch: () => void;
};

const MoreDropdownMenu = ({ retrievedLocations, location, refetch }: MoreDropdownMenuProps) => {
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
        locations: retrievedLocations.filter((l) => l.id !== location.id),
      });
      toast.success('Location deleted successfully.');
      refetch();
    } catch (err) {
      toast.error('Location could not be deleted.');
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

      <UpdateLocation
        retrievedLocations={retrievedLocations}
        location={location}
        refetch={refetch}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
    </div>
  );
};

function LocationsTable() {
  const { data, refetch, isLoading, error } = useRetrieveCurrentCompanyQuery({});

  useEffect(() => {
    if (error) {
      toast.error('Error loading locations.');
    }
  }, [error]);
  if (isLoading) {
    return <Spinner className="size-10 h-full mx-auto col-span-2" />;
  }
  if (error) {
    return <div>Error loading locations.</div>;
  }

  return (
    <div className="bg-background rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Latitude</TableHead>
            <TableHead>Longitude</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.locations?.map((location) => (
            <TableRow key={location.id}>
              <TableCell className="p-4">{location.id}</TableCell>
              <TableCell className="p-4">{location.type}</TableCell>
              <TableCell className="p-4">{location.latitude}</TableCell>
              <TableCell className="p-4">{location.longitude}</TableCell>
              <TableCell className="p-4">
                {location.address?.country +
                  ', ' +
                  location.address?.city +
                  ', ' +
                  location.address?.state +
                  ', ' +
                  location.address?.street +
                  ', ' +
                  location.address?.unit +
                  ', ' +
                  location.address?.postal_code}
              </TableCell>
              <TableCell className="text-right">
                <MoreDropdownMenu
                  retrievedLocations={data!.locations!}
                  location={location}
                  refetch={refetch}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default LocationsTable;
