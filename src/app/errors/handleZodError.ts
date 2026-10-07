import z from "zod"
import { IErrorSource, IGlobalErrorResponse } from "../interfaces/globalError.interface"
export const handleZodError = (err: z.ZodError):IGlobalErrorResponse =>{
    const statusCode = 400 
    const success = false
    const message = "Zod Validation Error"
    const errorSources : IErrorSource[]  = [] 

    err.issues.forEach(x=>{
        errorSources.push({
            path: x.path.join(" => "), 
            message: x.message
        })
    }) 

    return {
        success,
        statusCode,
        message,
        errorSources,
        error:err
    }
}