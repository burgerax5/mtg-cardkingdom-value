"use client"
import { redirect } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const HomeSearch = () => {
    const handleSubmit = async (formData: FormData) => {
        const name = formData.get('name')
        if (!name)
            redirect("/cards")
        else
            redirect("/cards?name=" + name)
    }

    return (
        <form action={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input name="name" className="w-full" placeholder="Search a Card" />
            <Button>Search</Button>
        </form>
    )
}

export default HomeSearch