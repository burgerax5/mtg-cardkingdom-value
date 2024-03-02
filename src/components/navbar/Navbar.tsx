import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from "../../../public/logo.svg"

interface Props {
    isLoggedIn: boolean
}

const Navbar: React.FC<Props> = ({ isLoggedIn }) => {
    return (
        <header className="flex items-center justify-center w-full border-b mb-3.5">
            <div className="flex items-center max-w-[1024px] h-14 justify-between w-full px-6" role="menubar">
                <Link href="/" className="flex gap-3 items-center">
                    <Image src={Logo} alt="logo" height={40} />
                    <div className="font-bold text-[1.25rem]">Card Appraiser</div>
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