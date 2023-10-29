import prisma from "../config/database.js";

async function findAllFood() {
    return prisma.food.findMany()
}

async function findFoodByNameOrCode(name, code) {
    return prisma.food.findMany({
        where: {
            OR: [
                {
                    code
                },
                {
                    name
                }
            ]
        }
    })
}

const foodRepository = {
    findAllFood,
    findFoodByNameOrCode
}

export default foodRepository