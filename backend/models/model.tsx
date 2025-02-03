import { Collection } from "mongodb";
import { initializeConnection, getDb } from "../db/connect";
import { MONGODB_URI, DATABASE_NAME } from "../db/config";
import { Stats } from "../data/types";

export const fetchAllStats = async (): Promise<Stats[]> => {
    try {
        await initializeConnection(MONGODB_URI, DATABASE_NAME);
        const db = getDb();
        const collection: Collection<Stats> = db.collection("PlayerStats"); // ✅ Collection name should be a string

        const stats = await collection.find({}).toArray(); // ✅ Fetch all player stats
        return stats;
    } catch (err) {
        console.error("Error fetching player stats:", err);
        throw err;
    }
};

