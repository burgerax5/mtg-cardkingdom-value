"use client"
import React from 'react'
import { Button } from '../ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Props {
    children: React.ReactNode,
    title: string,
    description: string,
    buttonText: string,
    handleAction: (data: FormData) => Promise<void>,
    errors: string
}

const AuthForm: React.FC<Props> = ({ children, title, description, buttonText, handleAction, errors }) => {
    return (
        <form className="w-full max-w-[400px]" action={handleAction}>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    {children}
                    {errors.length > 0 && <div className='text-destructive'>
                        {errors}
                    </div>}
                </CardContent>
                <CardFooter>
                    <Button type="submit">{buttonText}</Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default AuthForm