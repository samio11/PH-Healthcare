import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import config from "../config";
import { IErrorSource, IGlobalErrorResponse } from "../interfaces/globalError.interface";
import { handleZodError } from "../errors/handleZodError";
import AppError from "../errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err:any,req:Request,res:Response,next:NextFunction) =>{ 


    // eslint-disable-next-line prefer-const
    let statusCode: number = 500 
    // eslint-disable-next-line prefer-const
    let message: string = "Internal Server Error"  

    // eslint-disable-next-line prefer-const, @typescript-eslint/no-unused-vars
    let errorSources : IErrorSource[]  = [] 

    // eslint-disable-next-line prefer-const
    let stack : string | undefined = undefined;

    if(err instanceof ZodError){
       const x = handleZodError(err) 
       statusCode = x.statusCode as number
       message = x.message 
       errorSources = [...x.errorSources]  
       stack = err.stack

    } 
    else if(err instanceof AppError){
        statusCode = err.statusCode 
        message = err.message 
        stack = err.stack 
        errorSources = [
            {
                path: "",
                message : err.message
            }
        ]
    } 
     else if(err instanceof Error){
        statusCode = 400 
        message = err.message 
        stack = err.stack 
        errorSources = [
            {
                path: "",
                message : err.message
            }
        ]
    }
    const errorResponse :IGlobalErrorResponse = {
        success: false,
        statusCode,
        message,
        errorSources,
        error: config.NODE_ENV == 'development' ? err : undefined, 
        stack: config.NODE_ENV == 'development' ? stack : undefined
    }
    res.status(statusCode).json(errorResponse)
}