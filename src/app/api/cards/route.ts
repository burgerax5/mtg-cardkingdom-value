import { connectToDB } from "@/lib/dbutils";
import { Card } from "@/lib/model";

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

export async function GET(req: Request) {
    const url = new URL(req.url)

    const page = url.searchParams.get('page') ? parseInt(url.searchParams.get('page') as string) : 1
    const searchParam = url.searchParams.get('name') ? url.searchParams.get('name') as string : "";
    const editionParam = url.searchParams.get('edition');

    const regex = RegExp(searchParam, 'i')

    try {
        connectToDB()
        const num_cards = await Card.countDocuments({ name: regex })
        const cards = await Card.find({ name: regex }).skip((page - 1) * 100).limit(100).exec()
        return new Response(JSON.stringify({
            cards, num_cards
        }), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch card data", { status: 500 })
    }
}