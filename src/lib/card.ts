import { cookies } from "next/headers"
import { verifySession } from "./authenticate"
import { connectToDB } from "./dbutils";
import { User } from "./model";

interface ICard {
    name: string,
    image: string,
    prices: {
        nm: number,
        ex: number,
        vg: number,
        g: number,
    },
    quantities: {
        nm: number,
        ex: number,
        vg: number,
        g: number,
    }
}

interface IUser {
    id: string;
    name: string;
    email: string;
    cards: ICard[]
}

export const verifyCard = (card: unknown) => {
    return (
        typeof card === 'object' &&
        card !== null &&
        'name' in card &&
        typeof (card as ICard).name === 'string' &&
        'image' in card &&
        typeof (card as ICard).image === 'string' &&
        'prices' in card &&
        typeof (card as ICard).prices === 'object' &&
        'nm' in (card as ICard).prices &&
        typeof (card as ICard).prices.nm === 'number' &&
        'ex' in (card as ICard).prices &&
        typeof (card as ICard).prices.ex === 'number' &&
        'vg' in (card as ICard).prices &&
        typeof (card as ICard).prices.vg === 'number' &&
        'g' in (card as ICard).prices &&
        typeof (card as ICard).prices.g === 'number' &&
        'quantities' in card &&
        typeof (card as ICard).quantities === 'object' &&
        'nm' in (card as ICard).quantities &&
        typeof (card as ICard).quantities.nm === 'number' &&
        'ex' in (card as ICard).quantities &&
        typeof (card as ICard).quantities.ex === 'number' &&
        'vg' in (card as ICard).quantities &&
        typeof (card as ICard).quantities.vg === 'number' &&
        'g' in (card as ICard).quantities &&
        typeof (card as ICard).quantities.g === 'number'
    )
}

export const getCards = async (user: IUser) => {
    try {
        connectToDB()
        const u = await User.findById(user.id)
        return u.cards
    } catch (err) {
        console.error('Failed to retrieve cards:', err)
    }
}

export const addCard = async (user: IUser, card: unknown) => {
    try {
        connectToDB()
        const u = await User.findById(user.id)
        if (!u) throw new Error('Invalid user id')
        if (!verifyCard(card)) throw new Error('Invalid card data')

        await User.findByIdAndUpdate(user.id, {
            cards: [...u.cards, card]
        })
    } catch (err) {
        console.error('Failed to add card:', err)
    }
}