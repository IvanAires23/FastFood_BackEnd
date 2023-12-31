import { Router } from 'express'
import foodController from '../controller/food.controller.js'
import validateBody from '../middleware/validateBody.middleware.js'
import { foodSchema, categoryFoodSchema, createFoodSchema } from '../schema/food.schema.js'

const foodRouter = Router()

foodRouter.get('/', foodController.findAllFood)
foodRouter.post(
    '/category',
    validateBody(categoryFoodSchema),
    foodController.findByCategory
)
foodRouter.post(
    '/',
    validateBody(foodSchema),
    foodController.findFoodByNameOrCode
)
foodRouter.post('/create', validateBody(createFoodSchema), foodController.create)

export default foodRouter
