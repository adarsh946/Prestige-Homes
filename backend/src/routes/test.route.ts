import { Router } from "express";

const router = Router();

router.post("/should-be-login", shouldBeLogin);
router.post("/should-be-admin", shouldBeAdmin);
