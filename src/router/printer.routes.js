import { Router } from "express";
import validateBody from "../middleware/validateBody.middleware.js";
import { kitchenSchema } from "../schema/kitchen.schema.js";
import printerController from "../controller/printer.controller.js";

const printRouter = Router()

printRouter.post('/', validateBody(kitchenSchema), printerController.activatePrinter)

export default printRouter;