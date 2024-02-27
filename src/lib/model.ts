import mongoose from "mongoose";
const { Schema, model, connect } = mongoose

interface IUser {
    name: string;
    email: string;
    cards: ICard[]
}

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

const cardSchema = new Schema({
    name: String,
    image: String,
    prices: {
        nm: {
            type: Number,
            default: 0
        },
        ex: {
            type: Number,
            default: 0
        },
        vg: {
            type: Number,
            default: 0
        },
        g: {
            type: Number,
            default: 0
        }
    },
    quantities: {
        nm: {
            type: Number,
            default: 0
        },
        ex: {
            type: Number,
            default: 0
        },
        vg: {
            type: Number,
            default: 0
        },
        g: {
            type: Number,
            default: 0
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