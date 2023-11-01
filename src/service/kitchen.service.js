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

async function findAll(){
    const kitchen = await kitchenRepository.findAll();
    return kitchen;
}

const kitchenService = {
    create,
    findFoodInKitchen,
    findAll
};

export default kitchenService;