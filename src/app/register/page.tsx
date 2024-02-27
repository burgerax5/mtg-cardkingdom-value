import React from 'react'
import AuthForm from '@/components/authform/AuthForm'
import RegisterInputs from '@/components/authform/RegisterInputs'

const Page = () => {
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