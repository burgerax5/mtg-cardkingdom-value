"use client"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"

interface Props {
    handleAction: (formData: FormData) => Promise<void>
}

const CardForm: React.FC<Props> = ({ handleAction }) => {

    return (
        <form className="flex flex-col gap-3" action={handleAction}>
            <Textarea
                name="cards"
                placeholder="2 Puresteel Paladin"
                className="resize-none" />
            <Button type="submit">Build Deck</Button>
        </form>
    )
}

export default CardForm