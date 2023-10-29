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

async function create(body) {
    return prisma.category.create({
        data: {
            code: body.code,
            description: body.description,
            image: body.image,
            name: body.name,
            price: body.price,
            categoryId: body.categoryId,
            subDescription: body.subDescription
        }
    })
}

const foodRepository = {
    findAllFood,
    findFoodByNameOrCode,
    create
}

export default foodRepository