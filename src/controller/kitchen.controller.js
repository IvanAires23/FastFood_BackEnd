import httpStatus from 'http-status';
import kitchenService from '../service/kitchen.service.js';

async function create(req, res){
    try{
        const kitchen = await kitchenService.create(req.body);
        res.status(httpStatus.CREATED).send(kitchen);
    }catch(err){
        if(err.name === 'badRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const kitchenController = {
    create
};

export default kitchenController;