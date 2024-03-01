"use client"
import CardForm from "@/components/cardform/CardForm";
import Demo from "@/components/demo/Demo";
import Image from "next/image";
import { Suspense, useState } from "react"

const AuthFormContainer = () => {
    const [results, setResults] = useState<{
        total_price: string | null;
        cards_data: {
            name: string | null | undefined;
            image: string | null | undefined;
            edition: string | null | undefined;
            type: string | null | undefined;
            condition: string | null | undefined;
            price: number;
            stock: number;
            total: number;
        }[];
    } | null>(null)
    const [loading, setLoading] = useState(false)

    const gatherCards = (formData: FormData) => {
        const quantities = formData.getAll('quantity')
        const names = formData.getAll('name')
        const editions = formData.getAll('edition')

        let formatted_cards = ''
        for (let i = 0; i < quantities.length; i++) {
            formatted_cards += `${quantities[i]} ${names[i]}\n`
        }

        return {
            cards: formatted_cards,
            editions
        }
    }

    const handleAction = async (formData: FormData) => {
        setLoading(true)
        try {
            const api = 'http://localhost:3000/api/scrape'
            const data = gatherCards(formData)
            console.log(data)
            const res = await fetch(api, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data
                }),
                cache: 'no-store'
            })

            const res_data = await res.json()
            console.log(res_data)
            setResults(res_data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col sm:flex-row gap-8">
            <CardForm handleAction={handleAction} />
            <Suspense fallback={<div>Retrieving Data...</div>}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="w-full">
                        {results ? (
                            <>
                                <h2 className="text-2xl font-bold">Results:</h2>
                                <div>
                                    <h3>Price: {results.total_price}</h3>
                                </div>
                                <div>
                                    {results.cards_data.map(card => (
                                        <div className=" border p-3 rounded-lg" key={crypto.randomUUID()}>
                                            <h3 className="font-bold text-xl mb-3">{card.name}</h3>
                                            <div className="grid grid-cols-3">
                                                <Image src={`https://www.cardkingdom.com${card.image as string}`} alt={card.name as string} width={100} height={120} />
                                                <div className="col-span-2 grid grid-cols-2">
                                                    <span>Edition:</span>
                                                    <span>{card.edition}</span>
                                                    <span>Type:</span>
                                                    <span>{card.type}</span>
                                                    <span>Condition:</span>
                                                    <span>{card.condition}</span>
                                                    <span>Price:</span>
                                                    <span>${card.price}</span>
                                                    <span>Stock:</span>
                                                    <span>{card.stock}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <Demo />
                        )}
                    </div>
                )}
            </Suspense>
        </div>
    )
}

export default AuthFormContainer