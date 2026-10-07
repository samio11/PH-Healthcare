import { prisma } from "../../config/prisma"
import { TUpdateDoctor } from "./doctor.interface"

const getAllDoctor = async() =>{
   const doctors = await prisma.doctor.findMany({
    include:{
        user: true,
        specialties:{
            include:{
                specialty:true
            }
        }
    }
   }) 
   return doctors
}  

const getADoctor = async(id: string) =>{
  const result = await prisma.doctor.findUnique({
    where:{id},
    include:{
        user:true,
        specialties:{
            include:{
                specialty:true
            }
        }
    }
  }) 
  if(!result) throw new Error(`Doctor is not found on this id:-${id}`) 
  return result
} 

const updateADoctor = async(id: string,payload: TUpdateDoctor) =>{
    try{
        const doctorExists = await prisma.doctor.findUnique({where:{id}}) 
        if(!doctorExists) throw new Error("Doctor is not Exists") 
        const updt = await prisma.doctor.update({
    where: {id},
    data: payload
    }) 
    return updt
    } 
    catch(err){
        console.log("Doctor Update Error",err)
    }
}  

const deleteADoctor = async(id: string) =>{
    try{
         const doctorExists = await prisma.doctor.findUnique({where:{id}}) 
        if(!doctorExists) throw new Error("Doctor is not Exists")  
        await prisma.$transaction(async(tsx)=>{
            const doctor = await tsx.doctor.delete({where:{id}}) 
            await tsx.doctorSpecialty.deleteMany({where:{doctorId:doctor.id}}) 
            await tsx.user.delete({where:{email:doctor.email}})
        }) 
        return `Doctor is Deleted successfully.Name:-${doctorExists.name}`
    } 
    catch(err){
        console.log("Doctor Delete Failed",err)
    }
}

export const doctorServices = {getAllDoctor,getADoctor,updateADoctor,deleteADoctor}