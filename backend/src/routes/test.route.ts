import { Router } from "express";
import { verifyToken } from "../middleware/middleware";
import { shouldBeAdmin, shouldBeLogin } from "../controllers/test.controller";

const router = Router();

router.post("/should-be-login", verifyToken, shouldBeLogin);
router.post("/should-be-admin", shouldBeAdmin);
