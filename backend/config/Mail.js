import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail=async(to,otp)=>{
  console.log("EMAIL =", process.env.EMAIL_USER)
console.log("EMAIL_PASS =", process.env.EMAIL_PASS)
 await transporter.sendMail({
    from:`${process.env.EMAIL}`,
    to,
    subject:"Reset Your Password",
    html:`<p>Your OTP for Password reset is <b>${otp}</b>.
    It Expires in 5 minutes.</p>`

  })
}

export default sendMail