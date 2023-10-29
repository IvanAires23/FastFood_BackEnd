import { Router } from "express";
import foodController from "../controller/food.controller.js";
import validateBody from "../middleware/validateBody.middleware.js";
import foodSchema from "../schema/food.schema.js";

const foodRouter = Router()

foodRouter.get('/', foodController.findAllFood)
foodRouter.post('/', validateBody(foodSchema), foodController.findFoodByNameOrCode)
foodRouter.post('/create', foodController.create)

export default foodRouter