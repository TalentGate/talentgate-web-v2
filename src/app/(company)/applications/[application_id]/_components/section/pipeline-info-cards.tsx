import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

const PipelineInfoCards = () => {
  return (
    <section className="w-full grid grid-cols-5 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>
            <Star className="stroke-yellow-400 fill-yellow-400" />
            <span>4.5</span>
          </Label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Days in the Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>501 days</Label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge className="bg-purple-500/40 text-purple-200 not-dark:text-primary">
            Interview
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Last Updated At</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>2 days ago</Label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Number of Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>3</Label>
        </CardContent>
      </Card>
    </section>
  );
};

export default PipelineInfoCards;
