import Card from '@/components/card/Card'
import SearchForm from '@/components/searchform/SearchForm'
import React from 'react'
import styles from "./cards.module.css"

interface ICard {
    name: string,
    image: string,
    edition: string,
    conditions: {
        nm: {
            price: number,
            quantity: number
        },
        ex: {
            price: number,
            quantity: number
        },
        vg: {
            price: number,
            quantity: number
        },
        g: {
            price: number,
            quantity: number
        },
    },
}

const getCards = async (): Promise<ICard[]> => {
    const url = 'http://localhost:3000/api/cards'
    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
        console.error(res.status)
        throw new Error('Failed to fetch card data')
    }

    return res.json()
}

const page = async () => {
    const cards = await getCards()

    return (
        <div className="p-3">
            <h1 className="text-[2rem] font-bold">Search Results</h1>
            <div className="flex flex-col">
                <SearchForm />
                <div className={styles["cards-container"]}>
                    {cards.map(card => (
                        <Card key={crypto.randomUUID()} card={card} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page