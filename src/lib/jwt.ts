import jwt from "jsonwebtoken"
import util from "util"

export const SignJWT = (user: {
    id: string,
    username: string,
}) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1h' })
}

export const verifyJWT = async (token: string) => {
    const verifyAsync = util.promisify(jwt.verify)

    try {
        // Decoding the token and obtaining the user information
        const user = await verifyAsync(token, process.env.TOKEN_SECRET);

        // If verification is successful and user is found, return true
        return !!user;
    } catch (error) {
        console.error('An error occurred while verifying JWT', error);
        return false;
    }
}

export const getJWTPayload = async (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) reject(err)
            resolve(decoded)
        })
    })
}