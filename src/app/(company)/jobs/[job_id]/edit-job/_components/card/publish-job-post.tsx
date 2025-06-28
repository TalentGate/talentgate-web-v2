import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LinkedinIcon, PanelTop, SaveIcon, TwitterIcon } from "lucide-react";

const PipelineObservers = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Publish Job Post</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-3 items-center">
          <Checkbox className="size-5" checked disabled />
          <p className="flex gap-2 items-center">
            <span>
              <PanelTop className="size-5" />
            </span>
            <span>Career Page</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Checkbox className="size-6" />
          <p className="flex gap-2 items-center">
            <span>
              <LinkedinIcon className="size-5" />
            </span>
            <span>LinkedIn</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Checkbox className="size-6" />
          <p className="flex gap-2 items-center">
            <span>
              <TwitterIcon className="size-5" />
            </span>
            <span>X</span>
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="mt-4">
          <SaveIcon />
          <span>Save Changes</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PipelineObservers;
