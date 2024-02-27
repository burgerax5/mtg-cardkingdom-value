import React from 'react'
import AuthForm from '@/components/authform/AuthForm'
import RegisterInputs from '@/components/authform/RegisterInputs'
import { connectToDB } from '@/lib/dbutils'

const Page = () => {
    const register = async (data: FormData) => {
        connectToDB()
    }

    return (
        <AuthForm
            children={<RegisterInputs />}
            title="Register"
            description="Join today!"
            buttonText="Create account"
        />
    )
}

export default Page