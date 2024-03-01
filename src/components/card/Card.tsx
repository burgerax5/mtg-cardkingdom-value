"use client"
import Image from 'next/image'
import { useState } from 'react'

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
    },
}

interface Props {
    card: ICard
}

const Card: React.FC<Props> = ({ card }) => {
    const findGreatestCondition = () => {
        const nm = card.conditions.nm.quantity
        const ex = card.conditions.ex.quantity
        const vg = card.conditions.vg.quantity
        const g = card.conditions.g.quantity

        let selected = 0
        const conditions = ["NM", "EX", "VG", "G"]

        if (nm !== 0) selected = 0
        else if (ex !== 0) selected = 1
        else if (vg !== 0) selected = 2
        else if (g !== 0) selected = 3

        return conditions[selected] as "NM" | "EX" | "VG" | "G"
    }

    const findSelectedPrice = () => {
        switch (selectedCondition) {
            case "NM":
                return card.conditions.nm.price.toFixed(2)
            case "EX":
                return card.conditions.ex.price.toFixed(2)
            case "VG":
                return card.conditions.vg.price.toFixed(2)
            case "G":
                return card.conditions.g.price.toFixed(2)
            default:
                return 0
        }
    }

    const findSelectedQuantity = () => {
        switch (selectedCondition) {
            case "NM":
                return card.conditions.nm.quantity
            case "EX":
                return card.conditions.ex.quantity
            case "VG":
                return card.conditions.vg.quantity
            case "G":
                return card.conditions.g.quantity
            default:
                return 0
        }
    }

    const [selectedCondition, setSelectedCondition] = useState<"NM" | "EX" | "VG" | "G">(findGreatestCondition())
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
                    <div className={`${selectedCondition === "NM" ? active : inactive}`} onClick={() => setSelectedCondition("NM")}>NM</div>
                    <div className={`${selectedCondition === "EX" ? active : inactive}`} onClick={() => setSelectedCondition("EX")}>EX</div>
                    <div className={`${selectedCondition === "VG" ? active : inactive}`} onClick={() => setSelectedCondition("VG")}>VG</div>
                    <div className={`${selectedCondition === "G" ? active : inactive}`} onClick={() => setSelectedCondition("G")}>G</div>
                </div>
                <div className="border-l border-b border-r p-3 h-[5rem] text-center flex flex-col gap-1">
                    {findSelectedQuantity()} @ ${findSelectedPrice()}
                    {!findSelectedQuantity() && <span className="text-slate-400">Out of stock.</span>}
                </div>
            </div>
        </div>
    )
}

export default Card