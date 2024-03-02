import jwt from "jsonwebtoken"
import * as jose from "jose"

export const SignJWT = (user: {
    id: string,
    username: string,
}) => {
    return jwt.sign(user, process.env.TOKEN_SECRET as string, { expiresIn: '1h' })
}

export const verifyJWT = async (token: string) => {
    try {
        // Decoding the token and obtaining the user information
        const user = jwt.verify(token, process.env.TOKEN_SECRET as string);

        // If verification is successful and user is found, return true
        return !!user;
    } catch (error) {
        console.error('An error occurred while verifying JWT', error);
        return false;
    }
}

// export const getJWTPayload = async (token: string) => {
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decoded) => {
//             if (err) reject(err)
//             resolve(decoded)
//         })
//     })
// }

export const getJWTPayload = async (token: string | undefined) => {
    if (!token)
        throw new Error("No access token found")
    if (!process.env.TOKEN_SECRET)
        throw new Error("No access token secret found")

    const secret = process.env.TOKEN_SECRET as string
    return await jose.jwtVerify(token, new TextEncoder().encode(secret))
}