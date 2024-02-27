import React from 'react'
import AuthForm from '@/components/authform/AuthForm'
import LoginInputs from '@/components/authform/LoginInputs'

const Page = () => {
    const login = async () => {
        connectToDb()

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