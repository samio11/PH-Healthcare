import { Router } from "express";
import { doctorControllers } from "./doctor.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { updateDoctorSchemaZod } from "./doctor.validation";

const router = Router() 

router.get("/get_all",doctorControllers.getAllDoctors) 
router.get("/:id",doctorControllers.getADoctors) 

router.patch("/:id",validateRequest(updateDoctorSchemaZod),doctorControllers.updateADoctor) 
router.delete("/:id",doctorControllers.deleteADoctors)

export const doctorRoutes = router