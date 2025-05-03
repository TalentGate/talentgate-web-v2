"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

interface LinkedinButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    id: string
    name: string
    variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null
    onClick: React.MouseEventHandler<HTMLButtonElement>
    isLoading: boolean
    className: string
}

const LinkedinButton = ({ ...props }: Partial<LinkedinButtonProps>) => {
    return (
        <Button
            id={props.id}
            name={props.name}
            variant={props.variant}
            onClick={props.onClick}
            disabled={props.isLoading}
            className={props.className}
        >
            LinkedIn
        </Button>
    );
};

export default LinkedinButton;