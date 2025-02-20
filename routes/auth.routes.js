import express from "express";
import { signin, signout, signup } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/signin", signin)

router.post("/signup", signup)

router.get("/signout", signout)

export default router