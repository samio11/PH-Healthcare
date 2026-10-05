import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { specialtyServices } from "./specialty.service";

const createSpecialty = catchAsync(async(req,res)=>{
    const payload = req.body 
    const result = await specialtyServices.createSpecialty(payload) 
    sendResponse(res,{
        statusCode: 201,
        success: true,
        message:"Specialty is created",
        result: result
    })
}) 

const getAllSpecialty = catchAsync(async(req,res)=>{ 
    const result = await specialtyServices.getAllSpecialty() 
    sendResponse(res,{
        statusCode: 200,
        success: true,
        message:"Getting All Specialty",
        result: result
    })
})  

const getASpecialty = catchAsync(async(req,res)=>{ 
    const {id} = req.params
    const result = await specialtyServices.getASpecialty(id as string) 
    sendResponse(res,{
        statusCode: 200,
        success: true,
        message:"Getting A Specialty",
        result: result
    })
}) 

const deleteSpecialty = catchAsync(async(req,res)=>{ 
    const {id} = req.params
    const result = await specialtyServices.deleteSpecialty(id as string) 
    sendResponse(res,{
        statusCode: 200,
        success: true,
        message:"Deleting A Specialty",
        result: result
    })
}) 

const updateSpecialty = catchAsync(async(req,res)=>{ 
    const {id} = req.params 
    const payload = req.body
    const result = await specialtyServices.updateSpecialty(id as string,payload) 
    sendResponse(res,{
        statusCode: 200,
        success: true,
        message:"Update A Specialty",
        result: result
    })
}) 



export const specialtyController = {createSpecialty,getAllSpecialty,getASpecialty,deleteSpecialty,updateSpecialty}