import { login } from "@/lib/authenticate"
import { cookies } from "next/headers"

export async function POST(request: Request) {
    const user = await request.json()
    await login(user)

    if (cookies().get('access_token'))
        return new Response(`Logged in as ${user.username}`, { status: 200 })
    else
        return new Response('Failed to log in', {
            status: 400,
            statusText: 'Username or password is incorrect'
        })
}