import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FormPage2Props {
  mockAddJobFormStep: string[];
}

const FormPage2 = ({ mockAddJobFormStep }: FormPage2Props) => {
  return (
    <section>
      <ScrollArea className="border rounded-md p-3">
        <div className="grid gap-2 max-h-[50dvh]">
          {mockAddJobFormStep.map((item, i) => (
            <div
              className="py-1 px-2 border rounded-md flex justify-between items-center"
              key={i}
            >
              <div className="flex items-center gap-1 py-1">
                <span>{item}</span>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox className="size-5" />
                <p>Required?</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default FormPage2;
