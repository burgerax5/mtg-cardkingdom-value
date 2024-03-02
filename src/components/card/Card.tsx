"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'

interface ICard {
    _id: string,
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
    },
}

interface Props {
    card: ICard
}

const Card: React.FC<Props> = ({ card }) => {
    const router = useRouter()

    const findGreatestCondition = () => {
        const nm = card.conditions.nm.quantity
        const ex = card.conditions.ex.quantity
        const vg = card.conditions.vg.quantity
        const g = card.conditions.g.quantity

        let selected = 0
        const conditions = ["nm", "ex", "vg", "g"]

        if (nm !== 0) selected = 0
        else if (ex !== 0) selected = 1
        else if (vg !== 0) selected = 2
        else if (g !== 0) selected = 3

        return conditions[selected] as "nm" | "ex" | "vg" | "g"
    }

    const findSelectedPrice = () => {
        switch (selectedCondition) {
            case "nm":
                return card.conditions.nm.price.toFixed(2)
            case "ex":
                return card.conditions.ex.price.toFixed(2)
            case "vg":
                return card.conditions.vg.price.toFixed(2)
            case "g":
                return card.conditions.g.price.toFixed(2)
            default:
                return 0
        }
    }

    const findSelectedQuantity = () => {
        switch (selectedCondition) {
            case "nm":
                return card.conditions.nm.quantity
            case "ex":
                return card.conditions.ex.quantity
            case "vg":
                return card.conditions.vg.quantity
            case "g":
                return card.conditions.g.quantity
            default:
                return 0
        }
    }

    const addToDeck = async (
        cardId: string,
        quantity: number = 1,
        condition: 'nm' | 'ex' | 'vg' | 'g') => {
        try {
            const url = 'http://localhost:3000/api/deck/add'
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cardId: cardId,
                    quantity,
                    condition
                })
            })

            if (!res.ok)
                throw new Error("Failed to add card to deck")
            else {
                router.refresh()
            }
        } catch (err) {
            console.error(err)
        }
    }

    const [selectedCondition, setSelectedCondition] = useState<"nm" | "ex" | "vg" | "g">(findGreatestCondition())
    const active = "bg-slate-0 border-t border-l border-r"
    const inactive = "bg-slate-100 text-slate-400 border hover:text-black hover:underline"

    return (
        <div className="flex flex-col max-w-[160px] gap-2">
            <div className="text-[0.7rem] h-[25px] truncate">{card.edition}</div>
            <Image
                src={`${card.image.includes("https") ? card.image : "https://www.cardkingdom.com" + card.image}`}
                alt={card.name} width={180} height={220} className="rounded-lg w-full h-full" />
            <div className="text-sm truncate py-1">{card.name}</div>
            <div className="flex flex-col">
                <div className="grid grid-cols-4 cursor-pointer text-center">
                    <div className={`${selectedCondition === "nm" ? active : inactive}`} onClick={() => setSelectedCondition("nm")}>NM</div>
                    <div className={`${selectedCondition === "ex" ? active : inactive}`} onClick={() => setSelectedCondition("ex")}>EX</div>
                    <div className={`${selectedCondition === "vg" ? active : inactive}`} onClick={() => setSelectedCondition("vg")}>VG</div>
                    <div className={`${selectedCondition === "g" ? active : inactive}`} onClick={() => setSelectedCondition("g")}>G</div>
                </div>
                <div className="border-l border-b border-r p-3 h-[5rem] text-center flex flex-col gap-1">
                    {findSelectedQuantity()} @ ${findSelectedPrice()}
                    {!findSelectedQuantity() && <span className="text-slate-400">Out of stock.</span>}
                </div>
                <div className="border p-3">
                    <Button onClick={() => addToDeck(card._id, 1, selectedCondition)}>+ Add to Deck</Button>
                </div>
            </div>
        </div>
    )
}

export default Card