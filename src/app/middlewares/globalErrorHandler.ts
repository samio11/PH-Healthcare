import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err:any,req:Request,res:Response,next:NextFunction) =>{
    // eslint-disable-next-line prefer-const
    let statusCode: number = 500 
    // eslint-disable-next-line prefer-const
    let message: string = "Internal Server Error" 
    res.status(statusCode).json({
        success: false,
        message,
        error: err.message
    })
}