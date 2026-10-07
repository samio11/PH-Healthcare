import dotenv from "dotenv"; 
import path from "path";

dotenv.config({path:path.join(process.cwd(), ".env")}); 

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_URI: process.env.DATABASE_URL ,
  JWT_SECRET: process.env.JWT_SECRET, 
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET, 
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL
}