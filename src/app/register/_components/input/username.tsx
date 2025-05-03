"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"

interface UsernameInputProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string
    name: string
    type: React.HTMLInputTypeAttribute
    placeholder: string
    value: string | number | readonly string[]
    onChange: React.ChangeEventHandler<HTMLInputElement>
    isLoading: boolean
    className: string
}

const UsernameInput = ({ ...props }: Partial<UsernameInputProps>) => {
    return (
        <Input
            id={props.id}
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            disabled={props.isLoading}
            className={props.className}
        />
    );
};

export default UsernameInput;