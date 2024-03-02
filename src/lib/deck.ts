import { connectToDB } from "./dbutils"
import { User } from "./model"

interface ICard {
    name: string,
    image: string,
    edition: string,
    conditions: {
        nm: {
            price: number,
            quantity: number
        },
        ex: {
            price: number,
            quantity: number
        },
        vg: {
            price: number,
            quantity: number
        },
        g: {
            price: number,
            quantity: number
        },
    }
}

interface IUser {
    username: string;
    password: string;
    cards: ICard[]
}

const getDeck = async (username: string) => {
    connectToDB()
    const user: IUser | null = await User.findOne({ username: username })
    return user
}