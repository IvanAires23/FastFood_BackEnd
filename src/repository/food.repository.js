import prisma from "../config/database.js";

async function findAllFood() {
    return prisma.food.findMany()
}

const foodRepository = {
    findAllFood
}

export default foodRepository