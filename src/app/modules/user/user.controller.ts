import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.service";

const createDoctor = catchAsync(async(req,res)=>{
    const payload = req.body 
    const result = await userServices.createDoctor(payload) 
    sendResponse(res,{
        success: true, 
        statusCode: 201, 
        message:"Doctor Creation Done", 
        result
    })
}) 

export const userController = {createDoctor}