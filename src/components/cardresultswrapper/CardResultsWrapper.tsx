import styles from "./cards.module.css"
import Card from '@/components/card/Card'
import CardPagination from '@/components/pagination/CardPagination'
import { Suspense } from "react"

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

interface Props {
    params: string[]
}

const getCards = async (params: string): Promise<{
    cards: ICard[],
    num_cards: number
}> => {
    const url = 'http://localhost:3000/api/cards?' + params
    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
        console.error(res.status)
        throw new Error('Failed to fetch card data')
    }

    return await res.json()
}

const CardResultsWrapper = async ({ params }: Props) => {
    const results = await getCards(params.join('&'))
    const { cards, num_cards } = results

    return (
        <>
            <h3 className="text-lg font-bold">Results: {num_cards}</h3>
            <div className={styles["cards-container"]}>
                {cards.map(card => (
                    <Card key={crypto.randomUUID()} card={card} />
                ))}
            </div>
            <CardPagination />
        </>
    )
}

export default CardResultsWrapper