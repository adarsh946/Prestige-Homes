import { Router } from "express";

const router = Router();

router.post("/register", registration);
router.post("/login", login);
router.post("/logout", logout);
