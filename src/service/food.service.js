import foodRepository from "../repository/food.repository.js";

async function findAllFood() {
    const foods = await foodRepository.findAllFood()
    return foods
}

const foodService = {
    findAllFood
}

export default foodService
