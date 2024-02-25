import { error } from "console";
import mongoose from "mongoose";

export async function connect() {
    try {
       await mongoose.connect(process.env.MONGO_URL!)
       const connection=mongoose.connection
       connection.on('connected',()=>{
        console.log('MONGODB CONNECTED SUCCESFULLY')
       })
       connection.on('error',(error)=>{
        console.log("error in conning mongodb"+error)
        process.exit()
    })
    } catch (error) {
     console.log("something went wrong !!!")  
     console.error(error) 
    }
}