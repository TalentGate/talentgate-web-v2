'use client';

import { useState } from 'react';
import Header from './_components/header/header';
import OnboardingProgress from './_components/section/onboarding-progress';
import PersonalAccountSetup from './_components/card/personal-account-setup';
import CompanyProfile from './_components/card/company-profile';
import InviteTeamMembers from './_components/card/invite-team-members';
import OnboardingCompleted from './_components/card/onboarding-complete';

function Onboarding() {
  const [onboardingStep, setOnboardingStep] = useState<number>(1);

  const increaseStep = () => {
    if (onboardingStep < 4) {
      setOnboardingStep(onboardingStep + 1);
    }
  };

  const decreaseStep = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

  return (
    <main className="w-full h-screen p-8">
      <section className="flex flex-col gap-8 w-[40dvw] mx-auto pb-8">
        <Header />

        <OnboardingProgress onboardingStep={onboardingStep} />

        {onboardingStep === 1 && <PersonalAccountSetup increaseStep={increaseStep} />}

        {onboardingStep === 2 && (
          <CompanyProfile increaseStep={increaseStep} decreaseStep={decreaseStep} />
        )}

        {onboardingStep === 3 && (
          <InviteTeamMembers increaseStep={increaseStep} decreaseStep={decreaseStep} />
        )}

        {onboardingStep === 4 && <OnboardingCompleted decreaseStep={decreaseStep} />}
      </section>
    </main>
  );
}

export default Onboarding;
