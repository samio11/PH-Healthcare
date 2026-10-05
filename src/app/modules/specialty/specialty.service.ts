import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../config/prisma";

const createSpecialty = async(payload:Specialty): Promise<Specialty> =>{
   const result = await prisma.specialty.create({data:payload}) 
   return result
}  

const getAllSpecialty = async() =>{
    const result = await prisma.specialty.findMany() 
    return result
} 

const getASpecialty = async(id: string) =>{
    const result = await prisma.specialty.findUnique({where:{id:id}}) 
    if(!result){
        return new Error("No Specialty Found")
    }
    return result
} 

const updateSpecialty = async(id:string,payload: Partial<Specialty>) =>{
    const result = await prisma.specialty.update({where:{id:id},data:payload}) 
    return result
}

const deleteSpecialty = async(id: string) =>{
    const result = await prisma.specialty.delete({where:{id:id}}) 
    if(!result){
        return new Error("No Specialty Found")
    }
    return result
} 

export const specialtyServices = {
    createSpecialty, 
    getAllSpecialty,
    getASpecialty,
    updateSpecialty,
    deleteSpecialty
}