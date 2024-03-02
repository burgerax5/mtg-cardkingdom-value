import { getCardQtyFromDeck } from "@/lib/deck";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getJWTPayload } from "@/lib/jwt";

export async function GET(req: NextRequest) {
    try {
        // const { cardId } = await req.json()
        const token = cookies().get('access_token')?.value
        const { payload } = await getJWTPayload(token)

        const tmp_payload: any = payload

        // console.log(cardId, tmp_payload.username)

        const owned = 0
        // const owned = await getCardQtyFromDeck(tmp_payload.username, cardId)
        return new Response(JSON.stringify({
            owned
        }), { status: 200 })
    } catch (error) {
        console.error((error as Error).message)
        return new Response((error as Error).message, { status: 500 })
    }
}