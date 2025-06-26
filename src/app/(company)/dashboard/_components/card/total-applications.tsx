import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Users } from "lucide-react";

const TotalApplications = () => {
  return (
    <Card className="h-fit">
      <CardContent className="flex justify-between items-center">
        <div>
          <CardDescription>Total Applications</CardDescription>
          <p className="text-xl font-bold">58</p>
        </div>
        <span className="bg-green-600/50 rounded-md p-2">
          <Users className="size-8 stroke-green-200" />
        </span>
      </CardContent>
    </Card>
  );
};

export default TotalApplications;
