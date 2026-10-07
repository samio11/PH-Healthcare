import { NextFunction, Request, Response } from "express"
import z from "zod"
export const validateRequest = (zodSchema: z.ZodObject) => (req:Request,res:Response,next:NextFunction) =>{
    const result = zodSchema.safeParse(req.body) 
    if(!result.success) next(result.error) 
    req.body = result.data 
    next()
}