import { connectToDB } from "./dbutils"
import { Card, User } from "./model"
import { Schema, Document } from "mongoose"

interface ICard {
    id: string
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

interface IUser extends Document {
    username: string;
    password: string;
    cards: {
        cardId: Schema.Types.ObjectId,
        condition: 'nm' | 'ex' | 'vg' | 'g',
        quantity: number
    }[]
}

const getUser = async (username: string) => {
    connectToDB()
    const user: IUser | null = await User.findOne({ username: username })
    if (!user) throw new Error("User not found")
    return user
}

const checkCard = async (cardId: Schema.Types.ObjectId) => {
    connectToDB()
    const card_in_db = await Card.findById(cardId)
    return card_in_db ? true : false
}

export const getDeck = async (username: string) => {
    try {
        connectToDB()
        const user = await getUser(username)
        return user.cards
    } catch (error) {
        console.error("Failed to get cards from deck.", error)
    }
}

export const addCardToDeck = async (
    username: string,
    cardId: Schema.Types.ObjectId,
    quantity: number,
    condition: 'nm' | 'ex' | 'vg' | 'g') => {
    try {
        connectToDB()
        const user = await getUser(username)
        const isCard = await checkCard(cardId)

        if (!isCard) throw new Error("Card does not exist")
        if (!['nm', 'ex', 'vg', 'g'].includes(condition)) throw new Error("Invalid card condition")
        if (quantity <= 0 || quantity > 999) throw new Error("Invalid quantity. It must be between 1-999")

        const existingCardIndex = user.cards.findIndex((c) => String(c.cardId) === String(cardId) && c.condition === condition)
        console.log(user.cards)

        if (existingCardIndex !== -1)
            user.cards[existingCardIndex].quantity = quantity
        else
            user.cards.push({ cardId, condition, quantity })

        await user.save()
        return { success: true, message: "Card added successfully" }

    } catch (error) {
        console.error("Failed to add card to the deck.", error)
        return { success: false, message: "Failed to add card to the deck" }
    }
}