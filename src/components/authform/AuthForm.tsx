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
    buttonText: string
}

const AuthForm: React.FC<Props> = ({ children, title, description, buttonText, handleAction }) => {
    return (
        <form className="w-full max-w-[400px]" action={(e) => handleAction(e)}>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
                <CardFooter>
                    <Button>{buttonText}</Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default AuthForm