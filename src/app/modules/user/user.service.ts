import { Role, Specialty } from "../../../generated/prisma/client";
import { auth } from "../../config/auth";
import { prisma } from "../../config/prisma";
import { ICreateDoctorPayload } from "./user.interface";

const createDoctor = async(payload : ICreateDoctorPayload) =>{
   const specialties : Specialty[] = [] 
   for (const x of payload.specialties){
    const specialty = await prisma.specialty.findUnique({
        where:{
            id: x
        }
    }) 
    if(!specialty) throw new Error(`No ${x} found in Specialty Table`) 
    specialties.push(specialty)
   } 

   const userExists = await prisma.user.findUnique({where:{email: payload.doctor.email}}) 
   if(userExists) throw new Error("This User Already Exists") 

  //Now User Create and Doctor 
  const userData = await auth.api.signUpEmail({body:{
    name: payload.doctor.name,
    email: payload.doctor.email, 
    password: payload.password,
    role: Role.DOCTOR,
    needPasswordChange: true
  }}) 
  try{
    const result = await prisma.$transaction(async(tsx)=>{
        const doctor = await tsx.doctor.create({
            data: {
                userId: userData.user.id,
                ...payload.doctor
            }
        }) 
        const doctorSpecialtyData = specialties.map((x)=>{
            return {
                doctorId: doctor.id,
                specialtyId: x.id
            }
        }) 

        await tsx.doctorSpecialty.createMany({data: doctorSpecialtyData}) 
        const doctorData = await tsx.doctor.findUnique({where:{id:doctor.id},include:{user:true,specialties:true}})
        return doctorData
    }) 
    return result
  } 
  catch(err){
    console.log("Doctor Transection Error",err) 
    await prisma.user.delete({where: {id:userData.user.id}})
  }
} 

export const userServices = {createDoctor}