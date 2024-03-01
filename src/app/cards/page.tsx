"use client"
import CardResultsWrapper from '@/components/cardresultswrapper/CardResultsWrapper'
import SearchForm from '@/components/searchform/SearchForm'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'


const Page = async () => {
    const searchParams = useSearchParams()

    const params: string[] = []

    if (searchParams.get('page'))
        params.push('page=' + searchParams.get('name') as string)
    if (searchParams.get('name'))
        params.push('name=' + searchParams.get('name') as string)
    if (searchParams.get('edition'))
        params.push('edition=' + searchParams.get('edition') as string)

    const search = searchParams.get('name')

    return (
        <div className="p-3">
            <h1 className="text-[2rem] font-bold">Search Results</h1>
            <div className="flex flex-col">
                <SearchForm search={search} />
                <Suspense fallback={<div>Loading...</div>}>
                    <CardResultsWrapper params={params} />
                </Suspense>
            </div>
        </div>
    )
}

export default Page