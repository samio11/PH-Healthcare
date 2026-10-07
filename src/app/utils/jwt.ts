import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"

export const createJwtToken = (payload:JwtPayload,secret: string,{expiresIn}:SignOptions) =>{
    const token = jwt.sign(payload,secret,{expiresIn}) 
    return token
} 

export const verifyJwtToken = (token: string,secret:string):JwtPayload =>{ 
    const decode = jwt.verify(token,secret) as JwtPayload
    return decode
} 

export const decodedJwtToken = (token:string): JwtPayload | null =>{
    const token1 = jwt.decode(token) as JwtPayload 
    return token1
}