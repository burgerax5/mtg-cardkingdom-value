import Link from 'next/link'
import React from 'react'

interface Props {
    isLoggedIn: boolean
}

const Navbar: React.FC<Props> = ({ isLoggedIn }) => {
    return (
        <header className="flex justify-between w-full border-b mb-3.5">
            <div className="flex items-center max-w-screen-2xl h-14" role="menubar">
                <Link href="/">Logo</Link>
                <nav>
                    {!isLoggedIn && <>
                        <Link href="/login">Login</Link>
                        <Link href="/register">Register</Link>
                    </>}
                    {isLoggedIn && <Link href="/logout">Logout</Link>}
                </nav>
            </div>
        </header>
    )
}

export default Navbar