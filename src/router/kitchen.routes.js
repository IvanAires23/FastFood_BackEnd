import { Router } from 'express';
import validateBody from '../middleware/validateBody.middleware.js';
import kitchenSchema from '../schema/kitchen.schema.js';
import kitchenController from '../controller/kitchen.controller.js';

const kitchenRouter = Router();

kitchenRouter.post('/', validateBody(kitchenSchema), kitchenController.create);
kitchenRouter.get('/', kitchenController.findAll);
kitchenRouter.get('/:foodId', kitchenController.findFoodInKitchen);

export default kitchenRouter;