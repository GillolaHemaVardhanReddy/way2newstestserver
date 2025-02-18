import chalk from "chalk"
import { createError } from "../utils/error.create.js";
import { createpostdb } from "../db/functions/post.db.functions.js";

export const fetchPosts = async (req, res, next) => {
  try {
    console.log(chalk.blue.bgWhite('entered fetchPosts controller'))
    res.send("hello it's working")
  } catch (err) {
    console.log(chalk.red.bgWhite('error in mostLikedProducts analytics controller'))
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