import express from "express";
import { createPost, fetchPosts } from "../controllers/posts.controllers.js";

const router = express.Router()

router.get("/all", fetchPosts)

router.post("/create", createPost)

export default router