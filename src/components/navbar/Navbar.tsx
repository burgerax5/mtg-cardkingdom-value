import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from "../../../public/logo.svg"

interface Props {
    isLoggedIn: boolean
}

const Navbar: React.FC<Props> = ({ isLoggedIn }) => {
    return (
        <header className="flex justify-between w-full border-b mb-3.5">
            <div className="flex items-center max-w-screen-2xl h-14 justify-between w-full px-6" role="menubar">
                <Link href="/">
                    <Image src={Logo} alt="logo" height={40} />
                </Link>
                <nav className="flex gap-3">
                    <Link href="/cards">Cards</Link>
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