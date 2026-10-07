    export interface IErrorSource {
        path: string 
        message: string
    }

    export interface IGlobalErrorResponse {
       success: boolean
       statusCode: number
       message: string 
       errorSources: IErrorSource[], 
       error?: unknown  
       stack?: unknown 
    } 