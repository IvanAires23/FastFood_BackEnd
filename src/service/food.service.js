import foodRepository from "../repository/food.repository.js";

async function findAllFood() {
    const foods = await foodRepository.findAllFood()
    return foods
}

async function findFoodByNameOrCode(name, code) {
    const food = await foodRepository.findFoodByNameOrCode(name, code)
    return food
}

async function create(body) {
    const food = await foodRepository.create(body)
    return food
}

const foodService = {
    findAllFood,
    findFoodByNameOrCode,
    create
}

export default foodService
