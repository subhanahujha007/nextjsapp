import {connect} from "@/dBCONFIG/dbconfig"
import usermodel from "@/models/userModel.js"
import { NextRequest,NextResponse   } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request:NextRequest) {
    try {
        const reqbody=await request.json()
        const {username,email,password}=reqbody
        const user=await usermodel.findOne({email}) 
        if(user){
            return NextResponse.json("user already exits")
        }
        const salt=await bcryptjs.genSalt(10)
        const hashedpassword=await bcryptjs.hash(password,salt)
       const newuser= new usermodel({username,email,password:hashedpassword})
       const saveduser=await newuser.save()
            return NextResponse.json({message:"new user created",success:true,saveduser})
    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }
}