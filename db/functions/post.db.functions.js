import mongoose from "mongoose"
import { Post } from "../model/post.model.js"
import chalk from "chalk"
import { createError } from "../../utils/error.create.js"

export const createpostdb = async (data) => {
    try{
        const post = new Post(data)
        await post.save()
        console.log(chalk.white.bgYellow("Created post successfully"))
        return post;
    } catch(err) {
        console.log(err)
        console.log(chalk.white.bgRed("Error occured at createPostdb"))
        return createError(500, "Internal server error")
    }
}
