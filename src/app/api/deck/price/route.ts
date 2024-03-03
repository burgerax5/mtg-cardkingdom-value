import { cookies } from "next/headers"
import { getJWTPayload } from "@/lib/jwt"
import { getDeckPrice } from "@/lib/deck"

export async function GET(req: Request) {
    try {
        const token = cookies().get('access_token')?.value
        const { payload } = await getJWTPayload(token)

        const tmp_payload: any = payload
        const deckPrice = await getDeckPrice(tmp_payload.username)

        return new Response(JSON.stringify({
            price: deckPrice
        }))
    } catch (error) {
        return new Response("Failed to get deck price", { status: 400 })
    }
}