import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        cookies().set('access_token', '', { expires: new Date(0) })
        return new Response("BYE!")
    } catch (error) {
        console.error((error as Error).message)
        return Response.redirect(new URL('/', req.url))
    }
}

export async function GET(req: Request) {
    try {
        cookies().set('access_token', '', { expires: new Date(0) })
        return Response.redirect(new URL('/', req.url))
    } catch (error) {
        console.error((error as Error).message)
        return Response.redirect(new URL('/', req.url))
    }
}