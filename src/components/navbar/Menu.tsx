"use client"
import { MenuIcon, X, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import styles from "./navbar.module.css"
import Link from 'next/link'
import { Button } from '../ui/button'

interface Props {
    isLoggedIn: boolean
}

const Menu: React.FC<Props> = ({ isLoggedIn }) => {
    const [toggled, setToggled] = useState(false)

    return (
        <>
            <div className={styles.menu + " ml-auto cursor-pointer hover:opacity-70"} onClick={() => setToggled(t => !t)}>
                {!toggled ? <MenuIcon /> : <X />}
            </div>
            {toggled && <div className="absolute top-0 left-0 h-full mt-[56.99px] w-full bg-white transition-all duration-200 z-[99] h-[calc(100%_-_56.99px)]">
                <nav className="flex flex-col items-center justify-center h-full z-[99]">
                    <div className="w-full hover:bg-slate-100 border-t flex items-center justify-center">
                        <Link className={styles.link + " p-3"} href="/" onClick={() => setToggled(false)}>Home</Link>
                    </div>
                    <div className="w-full hover:bg-slate-100 border-t">
                        <Link className={styles.link + " p-3"} href="/cards" onClick={() => setToggled(false)}>Cards</Link>
                    </div>
                    <div className="w-full hover:bg-slate-100 border-t border-b">
                        <Link className={styles.link + " p-3 text-center"} href="/deck" onClick={() => setToggled(false)}>Deck</Link>
                    </div>
                    <div className="flex gap-3 mt-12 mb-60">
                        {!isLoggedIn && <>
                            <Link href="/login" onClick={() => setToggled(false)}>
                                <Button>Login</Button>
                            </Link>
                        </>}
                        {isLoggedIn && <Link href="/logout" onClick={() => setToggled(false)}>
                            <Button className={styles.link + " hover:text-red-500"} variant="outline">
                                Logout
                                <LogOut />
                            </Button>
                        </Link>}
                    </div>
                </nav>
            </div>}
        </>
    )
}

export default Menu