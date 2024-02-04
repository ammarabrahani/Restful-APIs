import express, { Router } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Users from "../Models/users.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/functions/api", async (req, res) => {
  const posts = await Users.find();
  console.log(posts);
  res.send(posts);
});
try {
  const conn = await mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {}
  );
  console.log(`MongoDB Connected: ${conn.connection.host}`);

  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
} catch (err) {
  console.error("Error connecting to MongoDB:", err.message);
}
