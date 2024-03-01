"use client"
import { useEffect, useState, useMemo } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ISet {
    name: string,
    code: string
}


const SelectSet = () => {
    const [sets, setSets] = useState<ISet[]>([])

    useEffect(() => {
        const getSets = async () => {
            await fetch('/api/sets')
                .then(res => res.json())
                .then(data => setSets(data))
        }

        getSets()
    }, [])

    const memoizedSets = useMemo(() => sets, [sets])

    return (
        <Select name="edition">
            <SelectTrigger className="w-[180px] text-left">
                <SelectValue placeholder="All Editions" />
            </SelectTrigger>
            <SelectContent className="w-[180px]">
                {memoizedSets.map(set => (
                    <SelectItem key={set.code} value={set.name ? set.name : "all"}>{set.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default SelectSet