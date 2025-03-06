import { Hono } from "hono";
import { registerUser, loginUser, getUserProfile } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const auth = new Hono();

auth.post("/register", registerUser);
auth.post("/login", loginUser);
auth.get("/me", authMiddleware, getUserProfile);

export default auth;
