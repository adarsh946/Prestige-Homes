import { Router } from "express";
import { verifyToken } from "../middleware/middleware";
import {
  addPosts,
  deletePosts,
  getAllPosts,
  getPost,
  updatePosts,
} from "../controllers/posts.controller";

const router = Router();

router.get("/:id", getPost);
router.get("/", getAllPosts);
router.post("/:id", verifyToken, addPosts);
router.post("/:id", verifyToken, updatePosts);
router.post("/:id", verifyToken, deletePosts);

export default router;
