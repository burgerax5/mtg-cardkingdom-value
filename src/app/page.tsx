"use client"
import CardForm from "@/components/cardform/CardForm";
import { Suspense, useState } from "react"

export default async function Home() {
  const [results, setResults] = useState("No results.")
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
    <main className="flex min-h-screen flex-col items-center">
      <CardForm handleAction={handleAction} />
      <Suspense fallback={<div>Retrieving Data...</div>}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>Results: {results}</div>
        )}
      </Suspense>
    </main>
  );
}
