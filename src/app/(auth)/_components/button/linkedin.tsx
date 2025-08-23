'use client';

import { signIn } from 'next-auth/react';
import React from 'react';

import { Button } from '@/components/ui/button';

interface LinkedinButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  name: string;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null;
  isLoading: boolean;
  className: string;
}

const LinkedinButton = ({ ...props }: Partial<LinkedinButtonProps>) => {
  const handleLinkedinSubmit = async () => {
    await signIn('linkedin');
  };

  return (
    <Button
      id={props.id}
      name={props.name}
      variant={props.variant}
      onClick={handleLinkedinSubmit}
      disabled={props.isLoading}
      className={props.className}
    >
      LinkedIn
    </Button>
  );
};

export default LinkedinButton;
