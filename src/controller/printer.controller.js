import httpStatus from "http-status";
import printerService from "../service/printer.service.js";

async function activatePrinter(req, res) {
    try {
        await printerService.activatePrinter(req.body)
        return res.status(httpStatus.CREATED).send('Imprimindo')
    } catch (err) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)        
    }
}

const printerController = {
    activatePrinter
}

export default printerController;