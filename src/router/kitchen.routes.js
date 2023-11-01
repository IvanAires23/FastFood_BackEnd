import { Router } from 'express';
import validateBody from '../middleware/validateBody.middleware.js';
import { kitchenSchema, kitchenReadySchema } from '../schema/kitchen.schema.js';
import kitchenController from '../controller/kitchen.controller.js';

const kitchenRouter = Router();

kitchenRouter.post('/', validateBody(kitchenSchema), kitchenController.create);
kitchenRouter.post('/ready', validateBody(kitchenReadySchema), kitchenController.readyKitchen);
kitchenRouter.get('/', kitchenController.findAll);
kitchenRouter.get('/:foodId', kitchenController.findFoodInKitchen);

export default kitchenRouter;