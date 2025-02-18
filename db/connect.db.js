import mongoose from 'mongoose';
import chalk from 'chalk'

export const connectToDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(chalk.bgGreen(chalk.white('connected to db successfully')))
    }catch(err){
        console.log(chalk.red('db connection error'))
    }
}