"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeftRight,
  Calendar,
  Download,
  Ellipsis,
  Mail,
  Phone,
} from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  applicant_name: string;
  application_position: string;
  applied_at: string;
}

const Header = ({
  applicant_name,
  application_position,
  applied_at,
}: HeaderProps) => {
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);

  return (
    <section className="w-full flex justify-between">
      <div className="flex gap-4 items-center">
        <Avatar className="size-16">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-semibold">{applicant_name}</h1>
          <p className="text-muted-foreground">
            Applied for {application_position} at {applied_at}
          </p>
        </div>
      </div>

      <DropdownMenu open={openDropdownMenu} onOpenChange={setOpenDropdownMenu}>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Phone />
            <span>Call</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Mail />
            <span>Send Email</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Calendar />
            <span>Set a Meeting</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArrowLeftRight />
            <span>Change Status</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download />
            <span>Download CV</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export default Header;
