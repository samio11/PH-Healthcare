import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createDoctorSchemaZod } from "./user.validation";

const router = Router() 

router.post("/create_doctor",validateRequest(createDoctorSchemaZod),userController.createDoctor) 

export const userRoutes = router