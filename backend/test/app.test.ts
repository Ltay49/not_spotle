import { initializeConnection, closeConnection } from "../db/connect";
import { MONGODB_URI, DATABASE_NAME } from "../db/config";
import { Db } from "mongodb";
import request from "supertest";
import app from "../app";
import { seeding } from "../db/seed";

import {
   playerStats
  } from "../data/testdata/playerStats";

  import {Stats} from "../data/testdata/types";

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
  test("should return a 200 status code for the root endpoint", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
  });
});

describe("GET: playerStas", () => {
  test("returns an array of player stats ", async () => {
    const response = await request(app).get("/api/playerStats");
    console.log(response.body)
    expect(response.status).toBe(200);
  });
});

describe("GET: playerByName", ()=>{
test("returns a single player", async ()=>{
  const response = await request(app).get("/api/playerStats/Mark Viduka");
  console.log(response.body)
  expect(response.status).toBe(200);
})
})

describe("GET: playerByName", ()=>{
  test("returns a single player", async ()=>{
    const response = await request(app).get("/api/playerStats/Mark Viduka");
    console.log(response.body)
    expect(response.status).toBe(200);
  })
  })
describe("GET: playerByName", ()=>{
    test("returns a single player", async ()=>{
      const response = await request(app).get("/api/playerStats/Mark Viduka");
      console.log(response.body)
      expect(response.status).toBe(200);
    })
    })
    // make an api call, generate a randon player, this can be done frotend, the random player stats will be held in
    // front end and used for the post request
// describe("POST: will post a body of player stats to the usedStats collection", ()=>{
//   test("populates the usedStats table with a player type", async ()=>{
//     const chosenPlayer = {
//       name:"Brad Friedel",
//       nationality:"Australian",
//       assists: 11,
//       goals: 14,
//       team:["Blackburn"],
//       teamUrl:['https://www.wafll.com/united-badges/european-shield.jpg'],
//       games: 200,
//       position:'Goalkeeper'
//   }
//     const response = await request(app)
//     .post("/api/usedStats")
//     .send(chosenPlayer)
//     .expect(201)
//     console.log(response.body)
//     expect(typeof response.body).toBe("object"); // Ensure the response is an object
//     expect(response.body).toHaveProperty("name", "Brad Friedel"); // Correct spelling
// ; 
//   });
// })