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
    let from_page = 1
    // if (page)
    //     from_page = parseInt(page)

    try {
        connectToDB()
        const cards = await Card.find({}).skip((from_page - 1) * 100).limit(100).exec()
        return new Response(JSON.stringify(cards), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch card data", { status: 500 })
    }
}