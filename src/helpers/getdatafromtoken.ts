import jwt from "jsonwebtoken"
import { NextRequest } from "next/server"

export const getdatafromtoken=(request:NextRequest)=>{
    try {
        const token=request.cookies.get('token')?.value || ""
        const decodedtoken:any=jwt.verify(token,process.env.TOKEN_SECREAT!)
        return decodedtoken._id
    } catch (error:any) {
       throw new Error(error.message)
    }

}