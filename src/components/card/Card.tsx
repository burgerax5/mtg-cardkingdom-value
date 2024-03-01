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

        if (nm === 0) selected++
        if (ex === 0) selected++
        if (vg === 0) selected++
        if (g === 0) selected++

        return conditions[selected % 4] as "NM" | "EX" | "VG" | "G"
    }

    const findSelectedPrice = () => {
        switch (selectedCondition) {
            case "NM":
                return card.conditions.nm.price
            case "EX":
                return card.conditions.ex.price
            case "VG":
                return card.conditions.vg.price
            case "G":
                return card.conditions.g.price
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

    return (
        <div className="flex flex-col">
            <div>{card.edition}</div>
            <Image src={`${card.image.includes("https") ? card.image : "https://www.cardkingdom.com" + card.image}`} alt={card.name} width={100} height={120} />
            <div>{card.name}</div>
            <div className="flex flex-col">
                <div className="grid grid-cols-4">
                    <div className={`${selectedCondition === "NM" ? "active" : ""}`} onClick={() => setSelectedCondition("NM")}>NM</div>
                    <div className={`${selectedCondition === "EX" ? "active" : ""}`} onClick={() => setSelectedCondition("EX")}>EX</div>
                    <div className={`${selectedCondition === "VG" ? "active" : ""}`} onClick={() => setSelectedCondition("VG")}>VG</div>
                    <div className={`${selectedCondition === "G" ? "active" : ""}`} onClick={() => setSelectedCondition("G")}>G</div>
                </div>
                <div>
                    {findSelectedQuantity()} @ ${findSelectedPrice()}
                </div>
            </div>
        </div>
    )
}

export default Card