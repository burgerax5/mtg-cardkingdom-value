import { removeCardFromDeck } from "@/lib/deck";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getJWTPayload } from "@/lib/jwt";

export async function DELETE(req: NextRequest) {
    try {
        const { cardId, condition } = await req.json()
        const token = cookies().get('access_token')?.value
        const { payload } = await getJWTPayload(token)

        const tmp_payload: any = payload

        const { message } = await removeCardFromDeck(tmp_payload.username, cardId, condition)
        return new Response(message, { status: 200 })
    } catch (error) {
        console.error((error as Error).message)
        return new Response((error as Error).message, { status: 500 })
    }
}