import jwt from "jsonwebtoken"

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

export const getJWTPayload = async (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decoded) => {
            if (err) reject(err)
            resolve(decoded)
        })
    })
}