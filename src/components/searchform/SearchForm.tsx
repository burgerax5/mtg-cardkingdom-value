import React from 'react'
import SelectSet from '../cardform/SelectSet'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import styles from "./SearchForm.module.css"


const SearchForm = () => {
    return (
        <form className={styles.form}>
            <div>
                <Label htmlFor="name">Card Name</Label>
                <Input name="name" />
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