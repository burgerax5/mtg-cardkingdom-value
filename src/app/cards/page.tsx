import React from 'react'

interface ICard {
    name: string,
    image: string,
    edition: string,
    prices: {
        nm: number,
        ex: number,
        vg: number,
        g: number,
    },
    quantities: {
        nm: number,
        ex: number,
        vg: number,
        g: number,
    }
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
            {cards.map(card => (
                <div>{card.name}</div>
            ))}
        </div>
    )
}

export default page