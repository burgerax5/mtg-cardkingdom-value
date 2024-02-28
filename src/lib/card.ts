import { Set } from "./model";
import { connectToDB } from "./dbutils";

export const addSets = async (sets: {
    name: string,
    code: string
}[]) => {
    try {
        connectToDB()
        const result = await Set.create(sets, { insertMany: true })
        console.log(`Inserted: ${result.length} sets`)
        return result
    } catch (error) {
        console.error('Failed to add set:', error)
    }
}