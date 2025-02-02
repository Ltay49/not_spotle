import {
    playerStats
  } from './data/playerStats';

  import { seeding } from "./db/seed";
  import { MongoClient } from "mongodb";
  import { initializeConnection, getDb } from "./db/connect";
  import { MONGODB_URI, DATABASE_NAME } from "./db/config";
  
  import app from "./app";
  
  const port: number = 8080;
  
  const bootstrap = async () => {
    // await seeding( italianWords, frenchWords, germanWords, spanishWords, urkainianWords )
    await initializeConnection(MONGODB_URI, DATABASE_NAME);
    await seeding(
      playerStats
    );
  
    return app.listen(port, () => {
      console.log("listening on port 8080");
    });
  };
  
  bootstrap().catch((err) => {
    console.log(err);
  });
  