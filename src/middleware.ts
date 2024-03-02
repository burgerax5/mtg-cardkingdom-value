import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import *  as jose from "jose"
import { getJWTPayload } from './lib/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    try {
        const token = cookies().get('access_token')?.value
        const isLoggedIn = await checkAuthenticated(token)

        // This route should not be accessible
        if (request.url.startsWith('/api/scrape')) {
            return NextResponse.redirect(new URL('/home', request.url))
        }

        // Deck API is only accessible to authenticated users
        else if (request.url.startsWith('/api/deck')) {
            if (!isLoggedIn)
                return NextResponse.redirect(new URL('/login', request.url))
            else
                return NextResponse.next()
        }

        // Login or Register Page
        else if (request.url.startsWith('/api/auth/login' || request.url.startsWith('/api/auth/register'))) {
            if (!isLoggedIn) return NextResponse.next()
            else NextResponse.redirect(new URL('/home', request.url))
        }

        // Logout
        else if (request.url.startsWith('/api/auth/logout')) {
            if (!isLoggedIn) return NextResponse.redirect(new URL('/home', request.url))
            else NextResponse.next()
        }

        // Must not be authenticated
        return NextResponse.next()
    } catch (error) {
        console.error(error)
        return new Response(
            "Failed to access route: " + (error as Error).message,
            { status: 500, statusText: (error as Error).message })
    }
}

const checkAuthenticated = async (token: string | undefined) => {
    if (!token) return false
    const secret = process.env.TOKEN_SECRET as string
    const { payload, protectedHeader } = await jose.jwtVerify(token, new TextEncoder().encode(secret))
    return !!payload && !!protectedHeader
}

export const config = {
    matcher: ['/api/scrape', '/api/:path*'],
}