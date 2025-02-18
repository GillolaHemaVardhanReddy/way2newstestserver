import mongoose from "mongoose"

export const postSchema = mongoose.Schema({
    heading : {
        type: String,
        required: true,
    },
    news : {
        type: String,
        required: true,
    },
    image : {
        type: String,
        required: true,
    },
})