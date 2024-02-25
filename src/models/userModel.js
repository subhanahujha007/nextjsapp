import mongoose from "mongoose"

const userschema=new mongoose.Schema({
username:{
    type:String,
    required:[true,"please provide a username"],
    unique:true
},
email:{
    type:String,
    required:[true,"please provide a email"],
    unique:true
},
password:{
    type:String,
    required:[true,"please provide a password"]
},
isVerified:{
    type:Boolean,
    default:false
},
isAdmin:{
    type:Boolean,
    default:false
},
forgotpasswordtoken:String,
forgotpasswordtokenexpiry:Date,
verifytoken:String,
verifytokenexpiry:Date,
})
const userModel= mongoose.models.users || mongoose.model("users",userschema) 
export default userModel

