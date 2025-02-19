import chalk from "chalk"
import { createError } from "../utils/error.create.js";
import { createpostdb } from "../db/functions/post.db.functions.js";
import { Post } from "../db/model/post.model.js";

export const fetchPosts = async (req, res, next) => {
  try {
    console.log(chalk.blue.bgWhite('entered fetchPosts controller'))
    const resp = await Post.find().sort({heading:1})
    console.log(chalk.green.bgWhite('cleared everything in fetchposts controller and sent response'))
    return res.status(200).json({
      success:true,
      data:resp
    })
  } catch (err) {
    console.log(chalk.red.bgWhite('error in fetchPosts controller:', err.message))
    next(createError(500, "internal error at fetch posts"));
  }
};

export const createPost = async (req, res, next) => {
    try{
        console.log(chalk.blue.bgWhite('Entered createPost controller'))
        const newPost = await createpostdb(req.body)
        const post = newPost.toObject();
        console.log(chalk.green.bgWhite('cleared everything in createPost controller and sent response'))
        res.status(201).json({
            success:true,
            data:post
        })
    } catch (err) {
        console.log(chalk.white.bgRed("Error occured at createPost controller"))
        next(createError(422, "missing parameters check once again"))
    }
}