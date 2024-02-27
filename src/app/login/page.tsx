import React from 'react'
import AuthForm from '@/components/authform/AuthForm'
import LoginInputs from '@/components/authform/LoginInputs'
import { connectToDB } from '@/lib/dbutils'
import { User } from '@/lib/model'

const Page = () => {
    const login = async (data: FormData) => {
        const api = ''
        const username = data.get('username')
        const password = data.get('password')

        connectToDB()

    }

    return (
        <AuthForm
            children={<LoginInputs />}
            title="Login"
            description="Track your MTG card prices"
            buttonText="Sign In"
        />
    )
}

export default Page