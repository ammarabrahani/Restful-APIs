import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import projectRoutes from "./Routes/projectRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/project", projectRoutes);

async function connectToMongo() {
  try {
    // Attempt MongoDB connection
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      connectTimeoutMS: 10000, // 10 seconds timeout for initial connection
    });

    // Start the server if MongoDB is connected successfully
    app.listen(5000, () => {
      console.log("Server is running on port 5000 - Connected to MongoDB");
    });
  } catch (err) {
    // Log the error

    // Retry after 5 seconds if the connection fails
    console.log("Retrying MongoDB connection in 5 seconds...");
    setTimeout(connectToMongo, 5000); // Retry after 5 seconds
  }
}

// Initial connection attempt
connectToMongo();
