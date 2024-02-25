import {connect} from "@/dBCONFIG/dbconfig"
import { NextRequest,NextResponse } from "next/server"
import userModel from "@/models/userModel"
connect()
export async function POST(request:NextRequest) {
    try {
        const reqbody=await request.json()
        const {token}=reqbody
        const user=await userModel.findOne({
            verifytoken:token,
            verifytokenexpiry:{
                $gt:Date.now()
            }
        })
        if(!user){
            return NextResponse.json({error:"invalid token"},{status:400})
        }
        user.isVerified=true;
        user.verifytoken=undefined;
        user.verifytokenexpiry=undefined;
        await user.save()
         return NextResponse.json({message:"email verify",sucess:true})
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}