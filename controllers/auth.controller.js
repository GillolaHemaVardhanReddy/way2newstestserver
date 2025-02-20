import chalk from "chalk"
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
import { createError } from "../utils/error.create.js";
import { checkForUserSignin, checkForUserSignup, checkPassword, createHashAndSave } from "../db/functions/auth.db.js";

export const signup = async (req,res,next)=>{ // body is email,name,password
    try{
        console.log(chalk.blue.bgWhite('Entered signup controller'))
        await checkForUserSignup(req.body.email)
        const newUser = await createHashAndSave(req.body)
        const {password , ...remain} = newUser.toObject();
        console.log(chalk.green.bgWhite('cleared all rules successfully and sent response'))
        res.status(201).json({
            success:true,
            data:remain
        })
    }catch(err){
        console.log(chalk.red.bgWhite('error in signup controller: ',err.message))
        if (err instanceof mongoose.CastError) return next(createError(400, 'enter valid details to update'));
        if (err.name === 'ValidationError') return next(createError(400, 'Validation Error'));
        next(err)
    }
}

export const signin = async (req,res,next)=>{
    try{
        console.log(chalk.blue.bgWhite('Entered signin controller'))
        const user = await checkForUserSignin(req.body.email)
        await checkPassword(req.body.password,user.password)
        const token = jwt.sign({email:user.email},process.env.JWT_SECRET,{expiresIn:'10d'}) // expires in 2days
        const {password , ...remain} = user.toObject();
        console.log(chalk.green.bgWhite('cleared all rules successfully and sent cookie'))
        res.cookie('auth',token, {
            maxAge: 1000 * 60 * 60 * 24 * 10,
             signed: true,
             httpOnly:true,
             partitioned: true
            } ).status(200).json({success:true,data:remain})
    }catch(err){
        console.log(chalk.red.bgWhite('error in signin controller: ',err.message))
        next(err)
    }
}


export const signout = async (req,res,next)=>{
    try{
        console.log(chalk.blue.bgWhite('Entered signout controller'))
        res.clearCookie('auth', { maxAge: 0 })
        console.log(chalk.green.bgWhite('cleared all rules successfully and logged out successfully'))
        res.status(200).json({
            success: true,
            data:'logged out successfully'
        })
    }catch(err){
        console.log(chalk.red.bgWhite('error in signout controller: ',err.message))
        next(err)
    }
}
