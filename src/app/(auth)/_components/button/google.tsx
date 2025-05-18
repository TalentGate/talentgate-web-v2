'use client';

import { signIn } from 'next-auth/react';
import React from 'react';

import { Button } from '@/components/ui/button';

interface GoogleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    id: string
    name: string
    variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null
    isLoading: boolean
    className: string
}

const GoogleButton = ({ ...props }: Partial<GoogleButtonProps>) => {
    const handleGoogleSubmit = async () => {
        await signIn("google");
    };

    return (
        <Button
            id={props.id}
            name={props.name}
            variant={props.variant}
            onClick={handleGoogleSubmit}
            disabled={props.isLoading}
            className={props.className}
        >
            Google
    </Button>
  );
};

export default GoogleButton;
