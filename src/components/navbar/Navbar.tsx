"use client"
import Link from 'next/link'
import React, { useLayoutEffect } from 'react'

const Navbar = () => {
    useLayoutEffect(() => {
        
    }, [])

    return (
        <header className="flex justify-between w-full border-b mb-3.5">
            <div className="flex items-center max-w-screen-2xl h-14" role="menubar">
                <Link href="/">Logo</Link>
                <nav>
                    <Link href="/login">Login</Link>
                    <Link href="/login">Register</Link>
                    <Link href="/login">Logout</Link>
                </nav>
            </div>
        </header>
    )
}

export default Navbar