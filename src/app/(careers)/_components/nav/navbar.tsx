import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Building, Globe } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b w-full h-16 flex items-center justify-between p-4">
      <Label>
        <Building />
        <span>Company Logo & Name</span>
      </Label>
      <Button>
        <Globe />
        <span>Company Website</span>
      </Button>
    </nav>
  );
};

export default Navbar;
