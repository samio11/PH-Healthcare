import express, { Application, Request, Response } from "express";
import cors from "cors"
import { rootRoute } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
const app: Application = express();
// Middleware to parse JSON bodies
app.use(express.json()); 
app.use(cookieParser()); // <--- যোগ করুন
app.use(cors({
  origin: ["http://localhost:3000"], // আপনার ফ্রন্টএন্ড ইউআরএল
  credentials: true
}));

app.use("/api/v1",rootRoute)
// Basic route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success:true,
    message:"Server is running successfully",
    upTime: process.uptime(),
    date:new Date()
  })
}); 
 

app.use(globalErrorHandler) 
app.use(notFound)



export default app
