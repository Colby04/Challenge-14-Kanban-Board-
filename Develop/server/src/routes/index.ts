import express from "express";
import { authenticateToken } from "../middleware/auth";
import authRoutes from "./auth-routes";

const router = express.Router();

router.use("/auth", authRoutes);

// Example protected route
router.get("/kanban", authenticateToken, (_, res) => {
  res.json({ message: "Welcome to the Kanban board!" });
});

export default router;
