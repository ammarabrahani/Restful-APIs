import express from "express";
import {
  createProject,
  getProjectsByUser,
  getProjectById,
  updateProject,
  deleteProject,
} from "../Controller/project.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new project
router.post("/projects", authMiddleware, createProject);

// Get all projects for the logged-in user
router.get("/projects", authMiddleware, getProjectsByUser);

// Get a single project by ID
router.get("/projects/:id", authMiddleware, getProjectById);

// Update an existing project
router.put("/projects/:id", authMiddleware, updateProject);

// Delete a project
router.delete("/projects/:id", authMiddleware, deleteProject);

export default router;
