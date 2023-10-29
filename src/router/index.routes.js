import { Router } from "express";
import foodController from "../controller/food.controller.js";
import foodRouter from "./food.routes.js";

const router = Router()

router.use('/food', foodRouter)

export default router