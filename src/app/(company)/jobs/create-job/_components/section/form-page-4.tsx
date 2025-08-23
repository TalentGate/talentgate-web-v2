import { LinkedinIcon, PanelTop, TwitterIcon } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';

const FormPage4 = () => {
  return (
    <section className="space-y-4 px-0 gap-8">
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
    </section>
  );
};

export default FormPage4;
