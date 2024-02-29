import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SelectSet from "./SelectSet";
import React from 'react'

const CardEntry = () => {
    return (
        <div className="flex gap-3">
            <div className="flex flex-col space-y-1.5 w-[65px]">
                <Label htmlFor="quantity">Qty</Label>
                <Input name="quantity" id="quantity" placeholder="0" min="0" max="99" type="number" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input name="name" id="name" placeholder="Name" autoComplete="name" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="edition">Edition</Label>
                <SelectSet />
            </div>
        </div>
    )
}

export default CardEntry