import { Router } from "express";
import { specialtyController } from "./specialty.controller";

const router = Router() 

router.post("/",specialtyController.createSpecialty) 
router.get("/getall",specialtyController.getAllSpecialty) 
router.get("/get/:id",specialtyController.getASpecialty) 

router.patch("/:id",specialtyController.updateSpecialty) 
router.delete("/:id",specialtyController.deleteSpecialty)

export const specialtyRouter = router