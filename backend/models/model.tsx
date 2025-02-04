import { Collection } from "mongodb";
import { initializeConnection, getDb } from "../db/connect";
import { MONGODB_URI, DATABASE_NAME } from "../db/config";
import { Stats } from "../data/devdata/types";

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

export const fetchPlayer = async (
    name: string
): Promise<Stats | null> => {
    try {
        // Initialize connection and get DB instance
        await initializeConnection(MONGODB_URI, DATABASE_NAME);
        const db = getDb();
        
        // Define collection for playerStats
        const collection: Collection<Stats> = db.collection("PlayerStats");

        // Find a single player by name
        const player = await collection.findOne({ name: name });

        // Return the player data or null if not found
        return player;
    } catch (err) {
        console.error("Error fetching player:", err);
        throw err;
    }
};

export interface ChosenPlayer {
    name: string;
    nationality: string;
    assists: number,
    goals: number;
    team: string[]
    teamUrl: string[];
    games: number;
    position: string;
}

export const updateUsedStats = async (body: ChosenPlayer): Promise<Stats | null> => {
    try {
      const playerToInsert: Omit<Stats, "_id"> = {
        name: body.name,
        nationality: body.nationality,
       assists: body.assists,
        goals: body.goals,
        team: body.team as string[],
        teamUrl: body.teamUrl as string[],
        games: body.games,
        position: body.position,
      };
  
      await initializeConnection(MONGODB_URI, DATABASE_NAME);
      const db = getDb();
      const collection: Collection<Stats> = db.collection("usedStats");
  
      const result = await collection.insertOne(playerToInsert);
      
      // Find the newly inserted player by its _id
      const updatedStatsPlayer = await collection.findOne({ _id: result.insertedId });
  
      return updatedStatsPlayer; // ✅ Fixed syntax error (replaced `,` with `;`)
    } catch (err) {
      throw err;
    }
  };
  