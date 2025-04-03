import { Router } from "express";
import { login, logout, registration } from "../controllers/auth.controller";

const router = Router();

router.post("/register", registration);
router.post("/login", login);
router.post("/logout", logout);

export default router;
