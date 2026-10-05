import { Role, UserStatus } from "../../../generated/prisma/client";
import { auth } from "../../config/auth";
import { prisma } from "../../config/prisma";

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
    const result = await prisma.$transaction(async (tx) => {
  const user = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        role: Role.PATIENT,
      },
    });

  const patient = await tx.patient.create({
    data: {
      userId: user.user.id,
      name,
      email,
    },
  });

  return {
    user,
    patient,
  };
}); 
return result
}   

const registerDoctor = async(payload : TRegisterPatient) =>{
    const {name,email,password} = payload 
    const result = await prisma.$transaction(async(tsx)=>{
        const user = await auth.api.signUpEmail({body:{
            name,
            email,
            password,
            role: Role.DOCTOR
        }})  
          if (!result.user) {
      throw new Error("User registration failed");
    }
        const doctor = await tsx.patient.create({data:{
            userId: user.user.id, 
            name: payload.name,
            email: payload.email
        }}) 
        return {user,doctor}
    }) 
    return result
}

const loginUser = async(payload:TLogin) =>{
    const {email,password} = payload
    const result = await auth.api.signInEmail({body:{email,password}}) 
    if (result.user.isDeleted === true) throw new Error("User is Deleted")
    if (
  result.user.status === UserStatus.BLOCKED ||
  result.user.status === UserStatus.DELETED
) {
  throw new Error("User Must be Active");
}
    return result
}

export const authServices = {registerPatient,loginUser,registerDoctor}