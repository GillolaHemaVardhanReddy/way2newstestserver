import mongoose from "mongoose"
import { postSchema } from "../schema/post.schema.js"

export const Post = mongoose.model("Post", postSchema)