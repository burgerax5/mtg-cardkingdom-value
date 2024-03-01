"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Page = async () => {
    const router = useRouter()

    const logout = async () => {
        const api = 'http://localhost:3000/api/auth/logout'
        await fetch(api, { method: 'POST' })
        router.push("/")
        router.refresh()
    }

    useEffect(() => {
        logout()
    }, [])

    return (
        <div>Logging out</div>
    )
}

export default Page