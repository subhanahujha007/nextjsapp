import { getdatafromtoken } from "@/helpers/getdatafromtoken";
import { NextResponse,NextRequest } from "next/server";
import {connect} from "@/dBCONFIG/dbconfig"
import userModel from "@/models/userModel";
connect()
export async function GET(request:NextRequest) {
    try {
        const userid=await getdatafromtoken(request)
        const response=await userModel.findOne({userid}).select("-password -isAdmin")
        console.log(response)
return NextResponse.json({message:"user found",data:response})
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}