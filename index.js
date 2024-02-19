import express, { Router } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Users from "./Models/users.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api", async (req, res) => {
  const users = await Users.find();
  console.log(users);
  res.send(users);
});
app.post("/api", async (req, res) => {
  const data = new Users({ email: req.body.email, phone: req.body.phone });
  try {
    data.save();
    res.status(201).json({ message: "successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
