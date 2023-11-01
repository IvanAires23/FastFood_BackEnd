import httpStatus from 'http-status';
import kitchenService from '../service/kitchen.service.js';

async function create(req, res){
    try{
        const kitchen = await kitchenService.create(req.body);
        res.status(httpStatus.CREATED).send(kitchen);
    }catch(err){
        if(err.name === 'badRequest') return res.status(httpStatus.BAD_REQUEST).send(err);
        else if(err.name === 'notFound') return res.status(httpStatus.NOT_FOUND).send(err);
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function findAll(req, res){
    try{
        const kitchen = await kitchenService.findAll();
        res.status(httpStatus.OK).send(kitchen);
    }catch(err){
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function readyKitchen(req, res){
    const { id } = req.body;

    try {
        const update = await kitchenService.readyKitchen(id);
        res.status(httpStatus.OK).send(update);
    } catch (err) {
        if(err.name === 'badRequest') return res.status(httpStatus.BAD_REQUEST).send(err);
        else if(err.name === 'notFound') return res.status(httpStatus.NOT_FOUND).send(err);

        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function deleteKitchen(req, res){
    const { id } = req.body;

    try {
        await kitchenService.deleteKitchen(id);
        res.sendStatus(httpStatus.OK);
    } catch (err) {
        if(err.name === 'notFound') return res.status(httpStatus.NOT_FOUND).send(err);

        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function findFoodInKitchen(req, res){

    const { foodId } = req.params;

    try {
        
        const food = await kitchenService.findFoodInKitchen(foodId);
        res.status(httpStatus.OK).send(food);
    } catch (err) {
        if(err.name === 'notFound') return res.status(httpStatus.NOT_FOUND).send(err);
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const kitchenController = {
    create,
    findAll,
    findFoodInKitchen,
    readyKitchen,
    deleteKitchen,
};

export default kitchenController;