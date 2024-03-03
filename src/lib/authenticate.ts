import bcrypt from "bcrypt"
import { NextApiHandler } from "next"
import { cookies } from "next/headers"
import { connectToDB } from "./dbutils"
import { SignJWT, verifyJWT } from "./jwt"
import { User } from './model'

const verifyPassword = async (password: string, hashedPassword: string) => {
    console.log(password, hashedPassword)
    return await bcrypt.compare(password, hashedPassword)
}

const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

export const register = async (user_data: {
    username: string,
    password: string
}) => {
    connectToDB()
    const hashedPassword = await hashPassword(user_data.password)
    const new_user = await User.create({
        username: user_data.username.toLowerCase(),
        password: hashedPassword
    })
    await new_user.save()
}

export const login = async (user: {
    username: string,
    password: string
}) => {
    const { username, password } = user

    connectToDB()
    await User.findOne({ username: username.toLowerCase() })
        .then(async (docs) => {
            if (!docs) console.log('No user found')
            else if (await verifyPassword(password, docs.password)) {
                const token = await SignJWT({ id: docs.id, username: docs.username })

                if (!token) throw new Error("Invalid token")

                cookies().set('access_token', token, {
                    expires: new Date(Date.now() + 15 * 60 * 1000),
                    httpOnly: true
                })
            } else {
                console.log("Invalid password")
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

export const verifySession = async (token: string) => {
    return await verifyJWT(token)
}

export const checkLoggedIn = async () => {
    const jwt = cookies().get('access_token')?.value
    if (!jwt) return false

    return await verifyJWT(jwt)
}