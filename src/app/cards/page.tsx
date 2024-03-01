import Card from '@/components/card/Card'
import React from 'react'

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
    console.log(cards)

    return (
        <div>
            <h1>Cards</h1>
            <div className="grid grid-cols-1 sm:grid-cols-6">
                {cards.map(card => (
                    <Card key={crypto.randomUUID()} card={card} />
                ))}
            </div>
        </div>
    )
}

export default page