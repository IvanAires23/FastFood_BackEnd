import { Router } from 'express'
import foodRouter from './food.routes.js'
import kitchenRouter from './kitchen.routes.js'
import printRouter from './printer.routes.js'

const router = Router()

router.use('/food', foodRouter)
router.use('/kitchen', kitchenRouter)
router.use('/printer', printRouter)

export default router
