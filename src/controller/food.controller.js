import httpStatus from 'http-status';
import foodService from '../service/food.service.js';

async function findAllFood(req, res) {
    try {
        const foods = await foodService.findAllFood();
        res.status(httpStatus.OK).send(foods);
    } catch (err) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function findFoodByNameOrCode(req, res) {
    const { code } = req.body;

    try {
        const food = await foodService.findFoodByNameOrCode(code);
        res.status(httpStatus.OK).send(food);
    } catch (err) {
        if (err.name === 'notFound') {
            return res.status(httpStatus.NOT_FOUND).send(err.message);
        }
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function create(req, res) {
    try {
        const food = await foodService.create(req.body);
        res.status(httpStatus.CREATED).send(food);
    } catch (err) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const foodController = {
    findAllFood,
    findFoodByNameOrCode,
    create
};

export default foodController;