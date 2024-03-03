import { getCardQtyFromDeck } from "@/lib/deck";
import { cookies } from "next/headers";
import { getJWTPayload } from "@/lib/jwt";
import { NextRequest } from "next/server";
import { ObjectId, Schema } from "mongoose";

export async function GET(req: NextRequest, res: Response) {
    try {
        const cardId: any = req.nextUrl.searchParams.get('cardId')
        const token = cookies().get('access_token')?.value
        const { payload } = await getJWTPayload(token)

        const tmp_payload: any = payload

        const { total, nm, ex, vg, g } = await getCardQtyFromDeck(tmp_payload.username, cardId as Schema.Types.ObjectId)
        return new Response(JSON.stringify({ total, nm, ex, vg, g }), { status: 200 })
    } catch (error) {
        console.error((error as Error).message)
        return new Response((error as Error).message, { status: 500 })
    }
}