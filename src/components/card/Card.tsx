"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'

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
    const { toast } = useToast()

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

    const [selectedCondition, setSelectedCondition] = useState<"nm" | "ex" | "vg" | "g">(findGreatestCondition())
    const [qtyOwned, setQtyOwned] = useState(0)
    const [qtyConditionOwned, setQtyConditionOwned] = useState<{ nm: number, ex: number, vg: number, g: number }>({
        nm: 0, ex: 0, vg: 0, g: 0
    })

    const active = "bg-slate-0 border-t border-l border-r"
    const inactive = "bg-slate-100 text-slate-400 border hover:text-black hover:underline"

    const addToDeck = async (
        card: ICard,
        qtyToAdd: number = 1,
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
                    cardId: card._id,
                    quantity: qtyConditionOwned[condition] + qtyToAdd,
                    condition
                })
            })

            if (!res.ok)
                throw new Error("Failed to add card to deck")
            else {
                setQtyOwned(qty => qty + qtyToAdd)
                toast({
                    title: "Added Card",
                    description: `Now: ${qtyConditionOwned[condition]}x ${card.name}`
                })
                router.refresh()
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const getQtyOwned = async (card_id: string) => {
            try {
                const api = 'http://localhost:3000/api/deck/quantity?cardId=' + card_id
                const res = await fetch(api)
                const { total, nm, ex, vg, g } = await res.json()

                if (total) setQtyOwned(total as number)
                if (nm || ex || vg || g) {
                    setQtyConditionOwned({ nm, ex, vg, g })
                }
            } catch (error) {
                console.error("Failed to check deck for card")
                return { owned: 0 }
            }
        }

        getQtyOwned(card._id)
    }, [])

    return (
        <div className="flex flex-col max-w-[160px] gap-2">
            <div className="text-[0.7rem] h-[25px] truncate">{card.edition}</div>
            <Image
                src={`${card.image.includes("https") ? card.image : "https://www.cardkingdom.com" + card.image}`}
                alt={card.name} width={180} height={220} className="rounded-lg w-full h-full" />
            <div className="flex flex-col">
                <div className={`text-sm truncate font-bold ${qtyOwned === 0 ? "text-slate-400" : "text-emerald-600"}`}>Owned: {qtyOwned}</div>
                <div className="text-sm truncate">{card.name}</div>
            </div>
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
                <div className="w-full border p-3 flex items-center justify-between">
                    <Button variant="secondary" className="hover:bg-destructive" disabled={qtyOwned < 1} onClick={() => addToDeck(card, -1, selectedCondition)}>-</Button>
                    {qtyConditionOwned[selectedCondition]}
                    <Button variant="secondary" className="hover:bg-emerald-600 hover:text-white" onClick={() => addToDeck(card, 1, selectedCondition)}>+</Button>
                </div>
            </div>
        </div>
    )
}

export default Card