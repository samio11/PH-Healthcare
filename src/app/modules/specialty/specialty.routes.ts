import { Router } from "express";
import { specialtyController } from "./specialty.controller";
import { checkAuth } from "../../middlewares/chechAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router() 

router.post("/",specialtyController.createSpecialty) 
router.get("/getall",checkAuth(Role.DOCTOR,Role.ADMIN,Role.SUPER_ADMIN),specialtyController.getAllSpecialty) 
router.get("/get/:id",specialtyController.getASpecialty) 

router.patch("/:id",specialtyController.updateSpecialty) 
router.delete("/:id",specialtyController.deleteSpecialty)

export const specialtyRouter = router