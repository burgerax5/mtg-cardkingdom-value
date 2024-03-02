import { cookies } from "next/headers"
import { getJWTPayload } from "@/lib/jwt"
import { getDeck } from "@/lib/deck"

export async function GET(req: Request) {
    try {
        const token = cookies().get('access_token')?.value
        const { payload } = await getJWTPayload(token)
        const tmp_payload: any = payload

        const deck = await getDeck(tmp_payload.username)
        return new Response(JSON.stringify(deck), { status: 200, statusText: "Successfully fetched deck" })
    } catch (error) {
        console.error("Failed to fetch deck. " + error)
        return new Response("Failed to fetch deck", { status: 500, statusText: (error as Error).message })
    }
}