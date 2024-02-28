"use client"
import CardForm from "@/components/cardform/CardForm";
import Demo from "@/components/demo/Demo";
import { Suspense, useState } from "react"

const AuthFormContainer = () => {
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleAction = async (formData: FormData) => {
        setLoading(true)

        try {
            const api = 'http://localhost:3000/api/scrape'
            const cards = formData.get('cards')
            const res = await fetch(api, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cards
                })
            })

            const price = await res.json()

            setResults(JSON.stringify(price))
            return price
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
                                <div>{results}</div>
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