import express from "express";
import { login, signup, verifyUser } from "../Controller/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify/:token", verifyUser);

export default router;
