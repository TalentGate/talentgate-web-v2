import React from 'react';

import Header from '@/components/section/header';

import Contact from './_components/card/contact';

const ContactTalentgate = () => {
  return (
    <main className="p-6 w-full h-full space-y-6">
      <Header
        header="Contact Talentgate"
        description="You can directly contact us for any questions, concerns, requests or feedback from this page."
      />

      <Contact />
    </main>
  );
};

export default ContactTalentgate;
