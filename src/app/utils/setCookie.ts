import { CookieOptions, Request, Response } from "express"
import ms from "ms"
import config from "../config"
type TToken = {
    accessToken: string 
    refreshToken: string
} 

export const setCookie = (res:Response,token:TToken) =>{ 
    const accessExpires = (config.ACCESS_EXPIRES as string || "1d").trim()
    const refreshExpires = (config.REFRESH_EXPIRES as string || "7d").trim()

    const maxAgeAccess = ms(accessExpires as ms.StringValue)
    const maxAgeRefresh = ms(refreshExpires as ms.StringValue)

    if(token.accessToken){
        res.cookie("accessToken",token.accessToken,{
            httpOnly: true, 
            secure: config.NODE_ENV === "production",
            sameSite: config.NODE_ENV === "production" ? "none" : "lax",
            maxAge: maxAgeAccess
        })
    } 
    if(token.refreshToken) { 
        res.cookie("refreshToken",token.refreshToken,{
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: config.NODE_ENV === "production" ? "none" : "lax",
            maxAge: maxAgeRefresh
        })
    }
} 

export const getCookie = (req:Request,key:string) =>{ 
    return req.cookies[key]
} 

export const clearCookie = (res:Response,key:string,options:CookieOptions) =>{
    return res.clearCookie(key,options)
}