import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const registerPatient = catchAsync(async(req,res)=>{
    const payload = req.body 
    const result = await authServices.registerPatient(payload) 
    sendResponse(res,{
        statusCode: 201,
        success: true,
        message:"Patient Created Done",
        result: result
    })
}) 

const loginUser = catchAsync(async(req,res)=>{
    const payload = req.body 
    const result = await authServices.loginUser(payload) 
    sendResponse(res,{
        statusCode: 200,
        success: true,
        message:"Patient Login Done",
        result: result
    })
}) 

export const authController = {registerPatient,loginUser}