import { cookies } from "next/headers";

export async function POST(req: Request) {
    const isLoggedIn = cookies().get('access_token')
    if (!isLoggedIn)
        throw new Error('User is not logged in')

    cookies().set('access_token', '', { expires: new Date(0) })
    return new Response("BYE!")
}