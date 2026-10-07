import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { doctorServices } from "./doctor.service";

const getAllDoctors = catchAsync(async(req,res)=>{
    const result = await doctorServices.getAllDoctor() 
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Getting All Doctor Info",
        result
    })
})  

const getADoctors = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await doctorServices.getADoctor(id as string) 
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Getting A Doctor Info",
        result
    })
})  

const updateADoctor = catchAsync(async(req,res)=>{
    const {id} = req.params 
    const payload = req.body
    const result = await doctorServices.updateADoctor(id as string,payload) 
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Update A Doctor Info",
        result
    })
})  

const deleteADoctors = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await doctorServices.deleteADoctor(id as string) 
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Delete A Doctor Info",
        result
    })
}) 

export const doctorControllers = {getAllDoctors,getADoctors,updateADoctor,deleteADoctors}