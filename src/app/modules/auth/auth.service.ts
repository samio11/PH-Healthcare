import { Role, UserStatus } from "../../../generated/prisma/client";
import { auth } from "../../config/auth";

type TRegisterPatient = {
    name: string 
    email: string 
    password: string
} 

type TLogin = {
    email: string 
    password: string
}

const registerPatient = async(payload:TRegisterPatient) =>{
    const {name,email,password} = payload 
    const result = await auth.api.signUpEmail({
        body:{
            name,email,password,role:Role.PATIENT
        }
    }) 
    if (!result.user) throw new Error("User Register Failed") 
    return result.user
}  

const loginUser = async(payload:TLogin) =>{
    const {email,password} = payload
    const result = await auth.api.signInEmail({body:{email,password}}) 
    if (result.user.isDeleted === true) throw new Error("User is Deleted")
    if(result.user.status === (UserStatus.BLOCKED || UserStatus.DELETED)) throw new Error("User Must be Active") 
    return result
}

export const authServices = {registerPatient,loginUser}