import {connect} from "@/dBCONFIG/dbconfig"
import userModel from "@/models/userModel"
import { NextResponse, NextRequest } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
connect()
export async function POST(request:NextRequest) {
    try {
        const reqbody=await request.json()
        const {email,password}=reqbody
        const user=await userModel.findOne({email})
        if(!user){
            return NextResponse.json({message:"user doesnt exists"})
        }
        const verifypassword=await bcryptjs.compare(password,user.password)
        if(!verifypassword){
            return NextResponse.json({message:"password is invalid"},{status:400})
        }
        const tokendata={
            id:user._id,
            username:user.username,
            email:user.email
        }
const token=await jwt.sign(tokendata,process.env.TOKEN_SECREAT!,{expiresIn:"1d"})
const response=NextResponse.json({
    message:"login succesfull",
    success:true
})
response.cookies.set("token",token,{httpOnly:true})
return response;
    } catch (error:any) {
        console.log(error)
      return NextResponse.json({error:error.message},{status:500})

    }
}