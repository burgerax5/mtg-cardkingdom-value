import mongoose from "mongoose";

const connection: any = {}

export const connectToDB = async () => {
    try {
        if (connection?.isConnected) {
            console.log("Using existing connection")
            return
        }

        const db = await mongoose.connect(process.env.MONGO_DB as string)
        connection.isConnected = db.connections[0].readyState
    } catch (error) {
        console.error("Something went wrong", error)
    }
}