import { addCardToDeck } from "@/lib/deck"
import { getJWTPayload } from "@/lib/jwt"
import { cookies } from "next/headers"

export async function POST(req: Request) {
    try {
        const { cardId, quantity, condition } = await req.json()
        const token = cookies().get('access_token')?.value
        const { payload } = await getJWTPayload(token)

        const tmp_payload: any = payload

        const { success, message } = await addCardToDeck(tmp_payload.username, cardId, quantity, condition)

        return new Response(message)
    } catch (error) {
        console.error("Failed to add card.")
        return new Response("Failed to add card.", { status: 500 })
    }
}