import { Router } from "express";
import foodController from "../controller/food.controller.js";

const router = Router()

router.get('/food', foodController.findAllFood)

export default router