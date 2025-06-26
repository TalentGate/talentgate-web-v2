import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Video, Users } from "lucide-react";

const UpcomingInterviews = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Interviews</CardTitle>
      </CardHeader>

      <CardContent className="flex gap-4 flex-wrap">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="bg-background">
            <CardContent className="flex items-center gap-4">
              <Video />
              <div>
                <CardDescription className="text-foreground">
                  John Smith
                </CardDescription>
                <CardDescription>Frontend Developer</CardDescription>
                <CardDescription className="text-foreground">
                  Jan 15th 2025, 10:00
                </CardDescription>
              </div>
            </CardContent>
            <CardFooter className="space-x-2">
              <Users className="size-4" />
              <CardDescription>John Doe, Jane Doe</CardDescription>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingInterviews;
