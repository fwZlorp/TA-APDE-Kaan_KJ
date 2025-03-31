import express from "express";

const router = express.Router();

// Test-Route
router.get("/", (req, res) => {
    res.json({ message: "API läuft! 🚀" });
});

export default router;
