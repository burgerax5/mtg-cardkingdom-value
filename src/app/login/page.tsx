"use client"
import React, { useState } from 'react'
import AuthForm from '@/components/authform/AuthForm'
import LoginInputs from '@/components/authform/LoginInputs'
import { useRouter } from "next/navigation"
import Link from 'next/link'

const Page = () => {
    const router = useRouter()
    const [errors, setErrors] = useState("")

    const login = async (data: FormData) => {
        const api = 'http://localhost:3000/api/auth/login'
        const username = data.get('username')
        const password = data.get('password')

        if (username !== null && password !== null) {
            const res = await fetch(api, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, password
                })
            })

            if (res.ok) {
                router.push("/")
                router.refresh()
            } else {
                setErrors(res.statusText)
            }
        } else {
            setErrors("Missing fields")
        }
    }


    return (
        <main className="min-h-svh w-full flex flex-col items-center justify-center p-3">
            <AuthForm
                title="Login"
                description="Track your MTG card prices"
                buttonText="Sign In"
                handleAction={login}
                errors={errors}
            >
                <LoginInputs />
            </AuthForm>
            <div className="mt-6 text-slate-400 mb-60">Don&apos;t have an account?
                <Link href="/register" className="text-black ml-3 hover:underline">Sign Up!</Link>
            </div>
        </main>
    )
}

export default Page