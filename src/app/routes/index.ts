import { Router } from "express";
import { specialtyRouter } from "../modules/specialty/specialty.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { doctorRoutes } from "../modules/doctor/doctor.routes";

export const rootRoute = Router() 

const moduleRoutes = [
    {
        path:"/specialty",
        element: specialtyRouter
    },
    {
        path:"/auth",
        element: authRoutes
    },
    {
        path: "/user",
        element: userRoutes
    },
    {
        path:"/doctor",
        element:doctorRoutes
    }
] 

moduleRoutes.forEach(x=> rootRoute.use(x.path,x.element))