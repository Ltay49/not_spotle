import { getDb } from "./connect";


export async function seeding(
  playerStats: any
): Promise<void> {
  try {
    const db = getDb();
    console.log("Connected to database:", db.databaseName);  // Logs the database name to confirm
    

    const collections = [
      { name: "PlayerStats", data: playerStats },
    ];

    for (const { name, data } of collections) {
      const collection = db.collection(name);
      await collection.deleteMany({});
      console.log(`${name} collection cleared.`);
      console.log("Seeding data:", data);
      await collection.insertMany(data);
      console.log(`${name} collection seeded with ${data.length} records.`);
    }

  } catch (err) {
    console.error("Seeding failed:", err);
    throw err;
  }
}
