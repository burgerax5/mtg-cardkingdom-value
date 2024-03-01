"use client"
import { useState } from 'react'
import SelectSet from '../cardform/SelectSet'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import styles from "./SearchForm.module.css"

interface Props {
    search: string | null
}

const SearchForm: React.FC<Props> = ({ search }) => {
    const [name, setName] = useState(search ? search : "")

    return (
        <form className={styles.form}>
            <div>
                <Label htmlFor="name">Card Name</Label>
                <Input name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <Label htmlFor="edition">Edition</Label>
                <SelectSet />
            </div>
            <Button className="mt-auto">Search</Button>
        </form>
    )
}

export default SearchForm