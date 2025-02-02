require('dotenv').config(); // Load .env variables

const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB successfully");
})
.catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});

