import mongoose from "mongoose";
const { Schema, model, connect } = mongoose

interface IUser {
    name: string;
    email: string;
    cards: ICard[]
}

interface ISet {
    name: string,
    code: string
}

interface ICard {
    name: string,
    image: string,
    edition: string,
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

const setSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    code: {
        type: String,
        unique: true
    }
})

const cardSchema = new Schema({
    name: String,
    image: String,
    edition: String,
    conditions: {
        nm: {
            quantity: { type: Number, default: 0 },
            price: { type: Number, default: 0 }
        },
        ex: {
            quantity: { type: Number, default: 0 },
            price: { type: Number, default: 0 }
        },
        vg: {
            quantity: { type: Number, default: 0 },
            price: { type: Number, default: 0 }
        },
        g: {
            quantity: { type: Number, default: 0 },
            price: { type: Number, default: 0 }
        }
    }
})

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    cards: {
        type: [cardSchema],
        default: []
    }
})


export const User = mongoose.models['User'] || model<IUser>('User', userSchema)
export const Card = mongoose.models['Card'] || model<ICard>('Card', cardSchema)
export const Set = mongoose.models['Set'] || model<ISet>('Set', setSchema)