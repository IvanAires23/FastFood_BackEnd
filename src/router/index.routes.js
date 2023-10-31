import { Router } from 'express';
import foodRouter from './food.routes.js';
import kitchenRouter from './kitchen.routes.js';

const router = Router();

router.use('/food', foodRouter);
router.use('/kitchen', kitchenRouter);

export default router;