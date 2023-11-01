import { Router } from 'express';
import validateBody from '../middleware/validateBody.middleware.js';
import { kitchenSchema, kitchenIdSchema } from '../schema/kitchen.schema.js';
import kitchenController from '../controller/kitchen.controller.js';

const kitchenRouter = Router();

kitchenRouter.post('/', validateBody(kitchenSchema), kitchenController.create);
kitchenRouter.post('/ready', validateBody(kitchenIdSchema), kitchenController.readyKitchen);
kitchenRouter.get('/', kitchenController.findAll);
kitchenRouter.get('/:foodId', kitchenController.findFoodInKitchen);
kitchenRouter.delete('/', validateBody(kitchenIdSchema), kitchenController.deleteKitchen);

export default kitchenRouter;