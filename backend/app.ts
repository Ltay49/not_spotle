import express from "express";

const app = express();

// Define a basic route to keep the server alive
app.get("/", (req, res) => {
  res.send("Server is running!");
});

export default app;
