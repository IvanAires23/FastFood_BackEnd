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

async function findFoodByNameOrCode(req, res) {
    const { name, code } = req.body

    try {
        const food = await foodService.findFoodByNameOrCode(name, code)
        res.status(httpStatus.OK).send(food)
    } catch (err) {
        res.statusSend(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const foodController = {
    findAllFood,
    findFoodByNameOrCode
}

export default foodController