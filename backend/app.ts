import express from "express";
import {getApi, getStats} from './controllers/app.controller'
const app = express();

// Define a basic route to keep the server alive
app.get("/api", getApi)
app.get("/api/playerStats", getStats)

export default app;
