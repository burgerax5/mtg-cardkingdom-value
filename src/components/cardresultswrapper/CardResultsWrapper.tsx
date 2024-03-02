import styles from "./cards.module.css"
import Card from '@/components/card/Card'
import CardPagination from '@/components/pagination/CardPagination'
import React, { Suspense } from "react"

interface ICard {
    _id: string,
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

interface Props {
    params: string[],
    curr_page: string | null
}

const getCards = async (params: string): Promise<{
    cards: ICard[],
    num_cards: number
}> => {
    try {
        const url = 'http://localhost:3000/api/cards?' + params
        const res = await fetch(url)

        if (!res.ok) {
            console.error(res.status)
            throw new Error('Failed to fetch card data')
        }

        return await res.json()
    } catch (error) {
        console.error(error)
        return new Promise(resolve => resolve({
            cards: [],
            num_cards: 0
        }))
    }
}

const CardResultsWrapper = async ({ params, curr_page }: Props) => {
    const queries = params.join('&')
    const results = await getCards(queries)
    const { cards, num_cards } = results

    return (
        <>
            {cards.length > 0 ?
                <>
                    <h3 className="text-lg font-bold">Results: {num_cards}</h3>
                    <div className={styles["cards-container"]}>
                        {cards.map(card => (
                            <Card key={crypto.randomUUID()} card={card} />
                        ))}
                    </div>
                    <CardPagination
                        path={"http://localhost:3000/cards?" + queries}
                        curr_page={curr_page}
                        num_cards={num_cards} />
                </> :
                <h3 className="text-lg font-bold">Oops. No results found</h3>}
        </>
    )
}

export default CardResultsWrapper