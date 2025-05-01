"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

interface LinkedinButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    id: string
    variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null
    onClick: React.MouseEventHandler<HTMLButtonElement>
    className: string
}

const LinkedinButton = ({ ...props }: Partial<LinkedinButtonProps>) => {
    return (
        <Button
            id={props.id}
            variant={props.variant}
            onClick={props.onClick}
            className={props.className}
        >
            LinkedIn
        </Button>
    );
};

export default LinkedinButton;