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

describe("API Health Check", () => {
  it("should return a 200 status code for the root endpoint", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
  });
});

describe("GET: playerStas", () => {
  it("returns an array of player stats ", async () => {
    const response = await request(app).get("/api/playerStats");
    console.log(response.body)
    expect(response.status).toBe(200);
  });
});