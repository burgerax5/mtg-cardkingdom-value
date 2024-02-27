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
                    <Input id="username" placeholder="Username" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirm_password">Confirm Password</Label>
                    <Input id="confirm_password" type="password" />
                </div>
            </div>
        </>
    )
}

export default RegisterInputs