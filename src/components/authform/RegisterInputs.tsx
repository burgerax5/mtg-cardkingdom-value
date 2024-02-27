"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const RegisterInputs = () => {
    return (
        <>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input name="username" id="username" placeholder="Username" autoComplete="username" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input name="password" id="password" type="password" autoComplete="current-password" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirm_password">Confirm Password</Label>
                    <Input name="confirm-password" id="confirm_password" type="password" />
                </div>
            </div>
        </>
    )
}

export default RegisterInputs