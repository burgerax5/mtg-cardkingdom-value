"use client"
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SetComboBox from "./SetComboBox";

interface Props {
    handleAction: (formData: FormData) => Promise<void>
}

const CardForm: React.FC<Props> = ({ handleAction }) => {
    return (
        <form className="flex flex-col gap-3 w-full max-w-[500px] p-6 border rounded-lg" action={handleAction}>
            <div className="flex gap-3">
                <div className="flex flex-col space-y-1.5 w-[65px]">
                    <Label htmlFor="quantity">Qty</Label>
                    <Input name="quantity" id="quantity" placeholder="0" min="0" max="99" type="number" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input name="name" id="name" placeholder="Name" autoComplete="name" />
                </div>
                <div className="flex mt-auto">
                    <SetComboBox />
                </div>
            </div>
            {/* <Textarea
                name="cards"
                placeholder="2 Puresteel Paladin"
                className="resize-none w-full" /> */}
            <Button type="submit">Build Deck</Button>
        </form>
    )
}

export default CardForm