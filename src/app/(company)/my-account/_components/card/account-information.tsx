import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SaveIcon } from "lucide-react";

const AccountInformation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col w-fit gap-4">
          <Avatar className="size-36">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Button variant={"secondary"}>Select photo</Button>
        </div>

        <div className="grid gap-4 grid-cols-2">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input placeholder="First Name" />
          </div>

          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input placeholder="Last Name" />
          </div>

          <div className="space-y-2">
            <Label>Username</Label>
            <Input placeholder="Username" />
          </div>

          <div className="space-y-2">
            <Label>Title</Label>
            <Input placeholder="Title" />
          </div>

          <div className="space-y-2 col-span-2">
            <Label>Email Address</Label>
            <Input placeholder="Email Address" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="h-fit w-full space-x-4">
        <Button className="h-fit">
          <SaveIcon />
          <span>Save Changes</span>
        </Button>
        <Button variant={"outline"} className="h-full">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountInformation;
