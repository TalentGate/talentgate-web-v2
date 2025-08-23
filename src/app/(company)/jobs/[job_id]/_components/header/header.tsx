import { LaptopIcon, MapPin, BuildingIcon, EllipsisIcon, PlusIcon } from 'lucide-react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  job_id?: string | undefined;
}

const Header = ({ job_id }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center w-full">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Job Title {job_id}</h1>

        <div className="flex gap-2 h-fit items-center">
          <Badge variant={'outline'}>
            <LaptopIcon />
            <p>Location Type</p>
          </Badge>
          <Badge variant={'outline'}>
            <MapPin />
            <p>Location</p>
          </Badge>
          <Badge variant={'outline'}>
            <BuildingIcon />
            <p>Department</p>
          </Badge>
        </div>
      </section>

      <section className="flex gap-2">
        <button>
          <Avatar className="rounded-full border items-center justify-center hover:bg-primary-foreground">
            <EllipsisIcon className="size-4 stroke-primary" />
          </Avatar>
        </button>

        <div className="flex -space-x-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Avatar key={i}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ))}
        </div>

        <button>
          <Avatar className="rounded-full border items-center justify-center hover:bg-primary-foreground">
            <PlusIcon className="size-4 stroke-primary" />
          </Avatar>
        </button>
      </section>
    </header>
  );
};

export default Header;
