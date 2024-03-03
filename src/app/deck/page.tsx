"use client"
import CardResultsWrapper from '@/components/cardresultswrapper/CardResultsWrapper'
import SearchForm from '@/components/searchform/SearchForm'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'


const Page = () => {
    const searchParams = useSearchParams()
    const api = "http://localhost:3000/api/deck"

    const params: string[] = []

    if (searchParams.get('page'))
        params.push('page=' + searchParams.get('page') as string)
    if (searchParams.get('name'))
        params.push('name=' + searchParams.get('name') as string)
    if (searchParams.get('edition'))
        params.push('edition=' + searchParams.get('edition') as string)

    const search = searchParams.get('name')

    return (
        <div className="p-3">
            <h1 className="text-[2rem] font-bold">Your MTG Deck</h1>
            <div className="flex flex-col">
                <SearchForm search={search} />
                <Suspense fallback={<div>Loading...</div>}>
                    <CardResultsWrapper api={api} params={params} curr_page={searchParams.get('page')} />
                </Suspense>
            </div>
        </div>
    )
}

export default Page