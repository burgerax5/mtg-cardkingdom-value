import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from "../../../public/logo.svg"
import { Button } from '../ui/button'
import Menu from './Menu'
import styles from "./navbar.module.css"

interface Props {
    isLoggedIn: boolean
}

const Navbar: React.FC<Props> = ({ isLoggedIn }) => {
    return (
        <header className="flex items-center justify-center w-full border-b mb-3.5">
            <div className="flex items-center max-w-[1024px] h-14 w-full px-6" role="menubar">
                <Link href="/" className="flex gap-3 items-center">
                    <Image src={Logo} alt="logo" height={40} />
                    <div className="font-bold text-[1.25rem] hidden sm:block text-nowrap">Card Appraiser</div>
                </Link>
                <nav className={styles["desktop-nav"]}>
                    <Link className={styles.link} href="/">Home</Link>
                    <Link className={styles.link} href="/cards">Cards</Link>
                    <Link className={styles.link} href="/deck">Deck</Link>
                    <div className="ml-auto flex gap-3">
                        {!isLoggedIn && <>
                            <Link href="/login">
                                <Button>Login</Button>
                            </Link>
                        </>}
                        {isLoggedIn && <Link href="/logout">
                            <Button className={styles.link + " hover:text-red-500"} variant="outline">
                                Logout
                                <LogOut />
                            </Button>
                        </Link>}
                    </div>
                </nav>
                <Menu isLoggedIn={isLoggedIn} />
            </div>
        </header>
    )
}

export default Navbar