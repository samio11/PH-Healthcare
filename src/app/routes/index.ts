import { Router } from "express";
import { specialtyRouter } from "../modules/specialty/specialty.routes";
import { authRoutes } from "../modules/auth/auth.routes";

export const rootRoute = Router() 

const moduleRoutes = [
    {
        path:"/specialty",
        element: specialtyRouter
    },
    {
        path:"/auth",
        element: authRoutes
    }
] 

moduleRoutes.forEach(x=> rootRoute.use(x.path,x.element))