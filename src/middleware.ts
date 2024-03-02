import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import *  as jose from "jose"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    try {
        const token = cookies().get('access_token')?.value
        const isLoggedIn = await checkAuthenticated(token)

        // This route should not be accessible
        if (request.url.includes('/api/scrape')) {
            return NextResponse.redirect(new URL('/home', request.url))
        }

        // Must be authenticated
        else if (request.url.includes('/api/deck')) {
            if (!isLoggedIn)
                return NextResponse.redirect(new URL('/login', request.url))
            else
                return NextResponse.redirect(new URL('/cards', request.url))
        }

        // Must not be authenticated
        return new Response("BRUH")
    } catch (error) {
        console.error(error)
        return new Response("Failed to access route:", { status: 500 })
    }
}

const checkAuthenticated = async (token: string | undefined) => {
    if (!token) return false
    if (!process.env.ACCESS_TOKEN)
        throw new Error("No access token found")

    const secret = process.env.ACCESS_TOKEN as string
    return token ? await jose.jwtVerify(token, new TextEncoder().encode(secret)) : false
}

// See "Matching Paths" below to learn more
export const config = {
    matchers: ['/api/scrape', '/api/deck*'],
}