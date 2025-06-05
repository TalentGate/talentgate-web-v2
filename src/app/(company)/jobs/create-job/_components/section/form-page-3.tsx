import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface FormPage3Props {
  mockAddObserversFormStep: string[];
}

const FormPage3 = ({ mockAddObserversFormStep }: FormPage3Props) => {
  return (
    <section className="w-full h-fit max-h-[60dvh] mt-5 flex flex-col gap-4 justify-between">
      <div className="w-full space-y-6">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Observer(s)" />
          </SelectTrigger>
          <SelectContent>
            {mockAddObserversFormStep.map((observer, i) => (
              <SelectItem value={observer} key={i}>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>TODO</AvatarFallback>
                </Avatar>
                {observer}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ScrollArea>
          <ul className="grid gap-2 max-h-[40dvh]">
            {mockAddObserversFormStep.map((observer, i) => (
              <li
                className="p-4 rounded-md border flex justify-between"
                key={i}
              >
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/124599?v=4"
                      alt="@shadcn"
                    />
                    <AvatarFallback delayMs={6000}>SC</AvatarFallback>
                  </Avatar>
                  <p>{observer}</p>
                </div>
                <Button variant={"ghost"}>
                  <X />
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </section>
  );
};

export default FormPage3;
