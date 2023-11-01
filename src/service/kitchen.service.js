import foodRepository from '../repository/food.repository.js';
import kitchenRepository from '../repository/kitchen.repository.js';

async function create(body){
    if(body.name === '') throw { name: 'badRequest', message: 'Your name is required' };
    else if(body.payment === '') throw {name: 'badRequest', message: 'Payment is required'};

    const food = await foodRepository.findById(body.foodId);
    if(!food) throw { name: 'notFound', message: 'Food not found' };

    const kitchen = await kitchenRepository.create(body);
    return kitchen;
}

async function findFoodInKitchen(foodId){

    const id = parseInt(foodId);

    const food = await foodRepository.findById(id);
    if(!food) throw { name: 'notFound', message: 'Food not found' };

    return food;
}

async function readyKitchen(id){
    const kitchen = await kitchenRepository.findKitchenById(id);
    if(!kitchen) throw {name: 'notFound', message: 'Not found kitchen'};
    else if (kitchen.preparation === 'READY') throw {name: 'badRequest', message: 'Request already ready'};

    const update = await kitchenRepository.readyKitchen(id);
    return update;
}

async function deleteKitchen(id){
    const kitchen = await kitchenRepository.findKitchenById(id);
    if(!kitchen) throw {name: 'notFound', message: 'Not found kitchen'};

    return await kitchenRepository.deleteKitchen(id);
}

async function findAll(){
    const kitchen = await kitchenRepository.findAll();
    return kitchen;
}

const kitchenService = {
    create,
    findFoodInKitchen,
    readyKitchen,
    deleteKitchen,
    findAll
};

export default kitchenService;