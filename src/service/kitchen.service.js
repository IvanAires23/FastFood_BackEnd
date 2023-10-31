import kitchenRepository from '../repository/Kitchen.repository.js';

async function create(body){
    if(body.name === '') throw { name: 'badRequest' };
    else if(body.payment === '') throw {name: 'badRequest'};

    const kitchen = await kitchenRepository.create(body);
    return kitchen;
}

const kitchenService = {
    create
};

export default kitchenService;