import { Router } from "express";
import { verifyToken } from "../middleware/middleware";

const router = Router();

router.post("/should-be-login", verifyToken, shouldBeLogin);
router.post("/should-be-admin", shouldBeAdmin);
