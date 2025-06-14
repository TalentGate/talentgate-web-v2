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

const CompanyAddress = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Address</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 w-full">
        <div className="space-y-2 col-span-2">
          <Label>Unit</Label>
          <Input placeholder="Unit" />
        </div>

        <div className="space-y-2 col-span-2">
          <Label>Street</Label>
          <Input placeholder="Street" />
        </div>

        <div className="space-y-2 col-span-2">
          <Label>City</Label>
          <Input placeholder="City" />
        </div>

        <div className="space-y-2 col-span-2">
          <Label>State</Label>
          <Input placeholder="State" />
        </div>

        <div className="space-y-2 col-span-2">
          <Label>Country</Label>
          <Input placeholder="Country" />
        </div>

        <div className="space-y-2">
          <Label>Latitude</Label>
          <Input placeholder="Latitude" />
        </div>

        <div className="space-y-2">
          <Label>Longitude</Label>
          <Input placeholder="Longitude" />
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

export default CompanyAddress;
