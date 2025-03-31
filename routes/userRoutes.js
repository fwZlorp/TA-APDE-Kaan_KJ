import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Benutzerregistrierung
router.post("/register", registerUser);

// Benutzer-Login
router.post("/login", loginUser);

export default router;
