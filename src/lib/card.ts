import { Set } from "./model";
import { connectToDB } from "./dbutils";

interface ISet {
    name: string,
    code: string
}

export const addSets = async (sets: ISet[]) => {
    try {
        connectToDB()
        const result = await Set.create(sets, { insertMany: true })
        console.log(`Inserted: ${result.length} sets`)
        return result
    } catch (error) {
        console.error('Failed to add set:', error)
    }
}

export const getSets = async (): Promise<ISet[]> => {
    try {
        connectToDB()
        return JSON.parse(JSON.stringify(await Set.find({})))
    } catch (error) {
        console.error("Failed to get sets:", error)
        return []
    }
}