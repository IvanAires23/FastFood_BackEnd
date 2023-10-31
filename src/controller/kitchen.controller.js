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

const kitchenController = {
    create,
    findAll
};

export default kitchenController;