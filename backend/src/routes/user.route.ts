import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller";
import { verifyToken } from "../middleware/middleware";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", verifyToken, getUser);
router.get("/:id/update", verifyToken, updateUser);
router.get("/:id/delete", verifyToken, deleteUser);
