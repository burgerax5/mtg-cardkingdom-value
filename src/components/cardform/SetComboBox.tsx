"use client"
import { useEffect, useState } from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Set } from "@/lib/model";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ISet {
    name: string,
    code: string
}


const SetComboBox = () => {
    const [open, setOpen] = useState(false)
    const [sets, setSets] = useState<ISet[]>([])
    const [selectedCode, setSelectedCode] = useState("")

    useEffect(() => {
        const getSets = async () => {
            await fetch('/api/sets')
                .then(res => res.json())
                .then(data => setSets(data))
        }

        getSets()
    }, [])
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedCode
                        ? sets.find((set) => set.code === selectedCode)?.name
                        : "Select sets..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search sets..." />
                    <CommandEmpty>No sets found.</CommandEmpty>
                    <CommandGroup>
                        {sets.map((set) => (
                            <CommandItem
                                key={set.code}
                                value={set.code}
                                onSelect={(currentValue) => {
                                    setSelectedCode(currentValue === selectedCode ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedCode === set.code ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {set.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default SetComboBox