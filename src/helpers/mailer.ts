import nodemailer from "nodemailer"
import userModel from "@/models/userModel"
import bcryptjs from "bcryptjs"

export const sendemail=async({email,emailtype,userid}:any)=>{
try {
   const hashedpassword= await bcryptjs.hash(userid.toString(),10)

   if(emailtype==="VERIFY"){
    await userModel.findByIdAndUpdate(userid,
        {verifytoken:hashedpassword,verifytokenexpiry:Date.now() + 24*60*60},{new:true,runValidators:true})
   }
else if(emailtype==="RESET"){
    await userModel.findByIdAndUpdate(userid,
        {forgotpasswordtoken:hashedpassword,forgotpasswordtokenexpiry:Date.now() + 24*60*60},{new:true,runValidators:true})   
}
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.user,
          pass: process.env.pass
        }
      });

const mailoptions={
    from:process.env.email,
    to:email,
    subject:emailtype==="VERIFY"?"verify your email":"reset password",
    html:`<p>click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedpassword}">here</a> to ${emailtype==="VERIFY"?"verify your email":"reset password"}
    or copy and paste the link below in your browser. <br> ${process.env.domain}/verifyemail?token=${hashedpassword}</p>`   
}
const mailresponse=await transport.sendMail(mailoptions)
return mailresponse
} catch (error:any) {
    
throw new Error(error.message)
}
}