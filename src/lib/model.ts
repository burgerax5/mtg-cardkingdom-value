import mongoose from "mongoose";
const { Schema, model, connect } = mongoose

interface IUser {
    username: string;
    password: string;
    cards: {
        cardId: string,
        condition: 'nm' | 'ex' | 'vg' | 'g',
        quantity: number
    }[]
}

interface ISet {
    name: string,
    code: string
}

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
        type: [{
            cardId: { type: Schema.Types.ObjectId, ref: 'Card', required: true },
            condition: { type: String, enum: ['nm', 'ex', 'vg', 'g'], required: true },
            quantity: { type: Number, required: true }
        }],
        default: []
    }
})


export const User = mongoose.models['User'] || model<IUser>('User', userSchema)
export const Card = mongoose.models['Card'] || model<ICard>('Card', cardSchema)
export const Set = mongoose.models['Set'] || model<ISet>('Set', setSchema)