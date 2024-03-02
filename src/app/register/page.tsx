"use client"
import React, { useState } from 'react'
import AuthForm from '@/components/authform/AuthForm'
import RegisterInputs from '@/components/authform/RegisterInputs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Page = () => {
    const router = useRouter()
    const [errors, setErrors] = useState("")

    const register = async (data: FormData) => {
        const api = "http://localhost:3000/api/auth/register"
        const username = data.get('username')
        const password = data.get('password')

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
            router.push("/login")
        } else {
            setErrors(res.statusText)
        }
    }

    return (
        <main className="min-h-svh w-full flex flex-col items-center justify-center p-3">
            <AuthForm
                title="Register"
                description="Join today!"
                buttonText="Create account"
                handleAction={register}
                errors={errors}
            >
                <RegisterInputs />
            </AuthForm>
            <div className="mt-6 text-slate-400 mb-60">Already have an account?
                <Link href="/login" className="text-black ml-3 hover:underline">Sign In</Link>
            </div>
        </main>
    )
}

export default Page