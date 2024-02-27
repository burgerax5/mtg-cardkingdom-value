import { register } from "@/lib/authenticate"

export async function POST(request: Request) {
    const user = await request.json()
    await register(user)
    return new Response(`Successfully registered user: ${user.username}`)
}