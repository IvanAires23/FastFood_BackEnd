import foodRepository from '../repository/food.repository.js';

async function findAllFood() {
    const foods = await foodRepository.findAllFood();
    return foods;
}

async function findFoodByNameOrCode(code) {
    const food = await foodRepository.findFoodByNameOrCode(code);
    if (food.length === 0) throw { name: 'notFound', message: 'Not Found Food' };
    return food;
}

async function findByCategory(category) {
    const food = await foodRepository.findByCategory(category);
    return food;
}

async function create(body) {
    const food = await foodRepository.create(body);
    return food;
}

const foodService = {
    findAllFood,
    findFoodByNameOrCode,
    findByCategory,
    create
};

export default foodService;
