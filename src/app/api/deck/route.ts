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

        const url = new URL(req.url)

        const page = url.searchParams.get('page') ? parseInt(url.searchParams.get('page') as string) : 1
        const searchParam = url.searchParams.get('name') ? url.searchParams.get('name') as string : "";
        const editionParam = url.searchParams.get('edition') ? url.searchParams.get('edition') as string : ""

        connectToDB()
        const { cards, num_cards } = await getCards(deck, page, searchParam, editionParam)
        return new Response(JSON.stringify({
            cards: cards,
            num_cards: num_cards
        }), { status: 200, statusText: "Successfully fetched deck" })
    } catch (error) {
        console.error("Failed to fetch deck. " + error)
        return new Response("Failed to fetch deck", { status: 500, statusText: (error as Error).message })
    }
}

const getCards = async (
    deck: {
        cardId: Schema.Types.ObjectId;
        condition: "nm" | "ex" | "vg" | "g";
        quantity: number;
    }[],
    page: number,
    name: string,
    edition: string
) => {
    try {
        let cards: ICard[] = []
        let num_cards = 0

        if (edition === "All Editions") edition = ""

        connectToDB()
        for (const card of deck) {
            const c: ICard | null = await Card.findById(card.cardId.toString())
            if (!c) throw new Error("Card not found")

            const card_in_list = cards.findIndex(cd => cd._id.toString() === card.cardId.toString())
            if (card_in_list === -1) cards.push(c)

            num_cards += card.quantity
        }

        cards = cards.filter(c => (c.name.toLowerCase().includes(name.toLowerCase()) && c.edition.includes(edition)))

        return { cards, num_cards }
    } catch (error) {
        console.error("Failed to retrieve cards from deck")
        return { cards: [], num_cards: 0 }
    }
}