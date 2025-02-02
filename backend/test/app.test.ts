import { initializeConnection, closeConnection } from "../db/connect";
import { MONGODB_URI, DATABASE_NAME } from "../db/config";
import { Db } from "mongodb";
import request from "supertest";
import app from "../app";
import { seeding } from "../db/seed";

import {
   playerStats
  } from "../data/playerStats";
  import { Stats} from "../data/types";

  let testDb: Db;

beforeAll(async () => {
  const { db } = await initializeConnection(MONGODB_URI, DATABASE_NAME);
  if (!db) {
    throw new Error("Failed to initialize the database");
  }
  testDb = db;

  await seeding(
 playerStats
 );

});

afterAll(async () => {
  await closeConnection();
});
