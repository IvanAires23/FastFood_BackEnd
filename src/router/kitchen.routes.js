import { Router } from 'express';
import validateBody from '../middleware/validateBody.middleware';
import kitchenSchema from '../schema/kitchen.schema';
import kitchenController from '../controller/kitchen.controller';

const kitchenRouter = Router();

kitchenRouter.post('/', validateBody(kitchenSchema), kitchenController.create);

export default kitchenRouter;