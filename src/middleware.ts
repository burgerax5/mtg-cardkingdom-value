import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import *  as jose from "jose"
import { getJWTPayload } from './lib/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    try {
        let token = cookies().get('access_token')?.value

        if (token && !request.nextUrl.pathname.startsWith('/api/auth/logout')) {
            const exp = jose.decodeJwt(token).exp as number
            const now = new Date().getTime()

            if (exp <= now) {
                return NextResponse.redirect(new URL('/api/auth/logout', request.url))
            }
        }

        // Logout
        if (request.nextUrl.pathname.startsWith('/api/auth/logout')) {
            return NextResponse.next()
        }

        const isLoggedIn = await checkAuthenticated(token)

        // if (!isLoggedIn && token) return NextResponse.redirect(new URL('/api/auth/logout', request.url))

        // This route should not be accessible
        if (request.nextUrl.pathname.startsWith('/api/scrape')) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        // Deck API is only accessible to authenticated users
        else if (request.nextUrl.pathname.startsWith('/api/deck')) {
            if (!isLoggedIn)
                return NextResponse.redirect(new URL('/login', request.url))
            else
                return NextResponse.next()
        }

        // Login or Register Page
        else if (request.nextUrl.pathname.startsWith('/api/auth/login' || request.nextUrl.pathname.startsWith('/api/auth/register'))) {
            if (!isLoggedIn) return NextResponse.next()
            else return NextResponse.redirect(new URL('/', request.url))
        }

        // Deck page should only be accessible if the user is logged in
        else if (request.nextUrl.pathname.startsWith('/deck')) {
            if (!isLoggedIn) return NextResponse.redirect(new URL('/login', request.url))
            else return NextResponse.next()
        }

        // Login & Register routes should only be accessible to guest users
        else if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
            if (!isLoggedIn) return NextResponse.next()
            else return NextResponse.redirect(new URL('/', request.url))
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
    matcher: ['/api/scrape', '/api/:path*', '/login', '/register', '/logout', '/deck'],
}