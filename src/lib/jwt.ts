import * as jose from "jose"

export const SignJWT = async (user: {
    id: string,
    username: string,
}) => {
    try {
        const secret = process.env.TOKEN_SECRET

        if (!secret) throw new Error("No access token secret found")
        const encoded_secret = new TextEncoder().encode(secret)

        const token = await new jose.SignJWT(user)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('15m')
            .sign(encoded_secret)

        return token
    } catch (error) {
        console.error((error as Error).message)
        return
    }
}

export const verifyJWT = async (token: string) => {
    try {
        const secret = process.env.TOKEN_SECRET
        if (!secret) throw new Error("No access token secret found")

        // Decoding the token and obtaining the user information
        const verifiedToken = jose.jwtVerify(token, new TextEncoder().encode(secret));

        return !!verifiedToken;
    } catch (error) {
        console.error('An error occurred while verifying JWT', error);
        return false;
    }
}

export const getJWTPayload = async (token: string | undefined) => {
    if (!token)
        throw new Error("No access token found")
    if (!process.env.TOKEN_SECRET)
        throw new Error("No access token secret found")

    const secret = process.env.TOKEN_SECRET as string
    return await jose.jwtVerify(token, new TextEncoder().encode(secret))
}