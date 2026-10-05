import { Response } from "express"

type TResponse<T> = {
    success: boolean,
    statusCode: number,
    message: string,
    result: T | T[] | null | undefined
} 

export const sendResponse = <T>(res:Response,data:TResponse<T>) =>{
    return res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        result: data.result
    })
} 