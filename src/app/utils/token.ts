import { JwtPayload, SignOptions } from "jsonwebtoken";
import { createJwtToken } from "./jwt";
import config from "../config";

export const getAccessToken = (payload:JwtPayload) =>{
    const accessToken = createJwtToken(payload,config.ACCESS_SECRET as string,{expiresIn:config.ACCESS_EXPIRES} as SignOptions) 
    return accessToken
} 

export const getRefreshToken = (payload:JwtPayload) =>{
    const refreshToken = createJwtToken(payload,config.REFRESH_SECRET as string,{expiresIn:config.REFRESH_EXPIRES} as SignOptions) 
    return refreshToken
}