import express from 'express'

import dotenv from "dotenv"
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
dotenv.config()
import dns from "dns";
import postRouter from './routes/post.routes.js'
import loopRouter from './routes/loop.routes.js'
import storyRouter from './routes/story.routes.js'
import messageRouter from './routes/message.routes.js'
import roadmapRouter from './routes/roadmap.routes.js'
import milestoneRouter from './routes/milestone.routes.js'
import anonymousRouter from './routes/anonymous.routes.js'
import { app, server } from './socket.js'

dns.setServers(["8.8.8.8"]);
const port=process.env.PORT || 5000
app.use(cors({
    origin:"https://loopr-seven.vercel.app",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.use("/api/loop",loopRouter)
app.use("/api/story",storyRouter)
app.use("/api/message",messageRouter)
app.use("/api/roadmap",roadmapRouter)
app.use("/api/milestone",milestoneRouter)
app.use("/api/anonymous",anonymousRouter)

server.listen(port , ()=>{
    connectDb()
    console.log("server started")

})
