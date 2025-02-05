import express from "express";
import {getApi, getStats, getPlayer, postChosenPlayer} from './controllers/app.controller'
import cors from "cors";
const app = express();

app.use(cors());

// Define a basic route to keep the server alive
app.get("/api", getApi)
app.get("/api/playerStats", getStats)
app.get("/api/playerStats/:name", getPlayer)

app.use(express.json());
app.post("/api/usedStats", postChosenPlayer);

export default app;
