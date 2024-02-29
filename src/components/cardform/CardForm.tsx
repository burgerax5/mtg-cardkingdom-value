"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CardEntry from "./CardEntry";

interface Props {
    handleAction: (formData: FormData) => Promise<any>,
}

const CardForm: React.FC<Props> = ({ handleAction }) => {
    const [entries, setEntries] = useState(1)

    const entriesArray = Array.from({ length: entries }, (_, index) => {
        return <CardEntry key={index} />
    })

    return (
        <form className="flex flex-col gap-3 w-full max-w-[500px] p-6 border rounded-lg" action={handleAction}>
            <div className="flex flex-col gap-3">
                {entriesArray}
            </div>
            <div className="border rounded-lg p-2 text-center cursor-pointer hover:bg-slate-600 hover:text-white transition-all duration-200" onClick={() => setEntries(prev => prev + 1)}>
                + Card
            </div>
            <Button type="submit">Get value</Button>
        </form>
    )
}

export default CardForm