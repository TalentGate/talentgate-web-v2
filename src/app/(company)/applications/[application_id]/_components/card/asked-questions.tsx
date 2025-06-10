import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const AskedQuestions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Asked Questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <CardDescription>
          <p className="font-semibold">
            What is the soonest date that you can start?
          </p>
          <p className="text-primary">31/11/2026</p>
        </CardDescription>

        <CardDescription>
          <p className="font-semibold">
            How many years of experience do you have with Java?
          </p>
          <p className="text-primary">4</p>
        </CardDescription>

        <CardDescription>
          <p className="font-semibold">
            How many years of experience do you have with React?
          </p>
          <p className="text-primary">12</p>
        </CardDescription>

        <CardDescription>
          <p className="font-semibold">
            Would you be willing to relocate to Turkey?
          </p>
          <p className="text-primary">Yes.</p>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default AskedQuestions;
