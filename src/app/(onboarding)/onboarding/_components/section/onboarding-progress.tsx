import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Building2, Goal, UserPen, Users, X } from 'lucide-react';

const LOADING_BAR_MULTIPLIER = 25;

function OnboardingProgress({ onboardingStep }: { onboardingStep: number }) {
  return (
    <section className="flex flex-col justify-center gap-4">
      {/* Progress Bar */}
      <Progress value={LOADING_BAR_MULTIPLIER * onboardingStep} className="w-full h-3" />

      {/* Section Indicator Group */}
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col items-center gap-2 mt-2">
          <UserPen
            className={cn([
              'rounded-full size-10 p-[0.6rem]',
              onboardingStep === 1
                ? 'stroke-accent bg-primary'
                : 'stroke-foreground/30 bg-primary/30',
            ])}
          />
          <span
            className={cn([
              'text-sm',
              onboardingStep === 1 ? 'text-foreground' : 'text-foreground/30',
            ])}
          >
            Personal Profile Setup
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 mt-2">
          <Building2
            className={cn([
              'rounded-full size-10 p-[0.6rem]',
              onboardingStep === 2
                ? 'stroke-accent bg-primary'
                : 'stroke-foreground/30 bg-primary/30',
            ])}
          />
          <span
            className={cn([
              'text-sm',
              onboardingStep === 2 ? 'text-foreground' : 'text-foreground/30',
            ])}
          >
            Company Profile
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 mt-2">
          <Users
            className={cn([
              'rounded-full size-10 p-[0.6rem]',
              onboardingStep === 3
                ? 'stroke-accent bg-primary'
                : 'stroke-foreground/30 bg-primary/30',
            ])}
          />
          <span
            className={cn([
              'text-sm',
              onboardingStep === 3 ? 'text-foreground' : 'text-foreground/30',
            ])}
          >
            Invite Team Members
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 mt-2">
          <Goal
            className={cn([
              'rounded-full size-10 p-[0.6rem]',
              onboardingStep === 4
                ? 'stroke-accent bg-primary'
                : 'stroke-foreground/30 bg-primary/30',
            ])}
          />
          <span
            className={cn([
              'text-sm',
              onboardingStep === 4 ? 'text-foreground' : 'text-foreground/30',
            ])}
          >
            Onboarding Complete
          </span>
        </div>
      </div>
    </section>
  );
}

export default OnboardingProgress;
