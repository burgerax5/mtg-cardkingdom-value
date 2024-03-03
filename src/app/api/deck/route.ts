import { cookies } from "next/headers"
import { getJWTPayload } from "@/lib/jwt"
import { getDeck } from "@/lib/deck"
import { Card } from "@/lib/model"
import { connectToDB } from "@/lib/dbutils"
import { Schema } from "mongoose"

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

export async function GET(req: Request) {
    try {
        const token = cookies().get('access_token')?.value
        const { payload } = await getJWTPayload(token)
        const tmp_payload: any = payload

        const deck = await getDeck(tmp_payload.username)

        if (!deck) throw new Error("Could not find deck")

        connectToDB()
        const { cards, num_cards } = await getCards(deck)

        return new Response(JSON.stringify({
            cards: cards,
            num_cards: num_cards
        }), { status: 200, statusText: "Successfully fetched deck" })
    } catch (error) {
        console.error("Failed to fetch deck. " + error)
        return new Response("Failed to fetch deck", { status: 500, statusText: (error as Error).message })
    }
}

const getCards = async (deck: {
    cardId: Schema.Types.ObjectId;
    condition: "nm" | "ex" | "vg" | "g";
    quantity: number;
}[]) => {
    try {
        const cards: ICard[] = []
        let num_cards = 0

        connectToDB()
        for (const card of deck) {
            const c: ICard | null = await Card.findById(card.cardId.toString())
            if (!c) throw new Error("Card not found")

            const card_in_list = cards.findIndex(cd => cd._id.toString() === card.cardId.toString())
            if (card_in_list === -1) cards.push(c)

            num_cards += card.quantity
        }

        return { cards, num_cards }
    } catch (error) {
        console.error("Failed to retrieve cards from deck")
        return { cards: [], num_cards: 0 }
    }
}