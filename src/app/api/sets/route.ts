import { getSets } from "@/lib/card";

export async function GET(req: Request) {
    const data = await getSets()
    return new Response(JSON.stringify(data))
}