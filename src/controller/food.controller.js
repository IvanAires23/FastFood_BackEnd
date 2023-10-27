import httpStatus from "http-status";
import foodService from "../service/food.service.js";

async function findAllFood(req, res) {
    try {
        const foods = await foodService.findAllFood()
        res.status(httpStatus.OK).send(foods)
    } catch (err) {
        res.statusSend(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const foodController = {
    findAllFood
}

export default foodController