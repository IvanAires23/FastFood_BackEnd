import prisma from '../config/database.js';

async function findAllFood() {
    return prisma.food.findMany();
}

async function findFoodByNameOrCode(code) {
    return prisma.food.findMany({
        where: {
            OR: [
                { code },
                { name: code }
            ],

        }
    });
}

async function findById(id){
    return prisma.food.findFirst({ where: { id } });
}

async function create(body) {
    return prisma.food.create({
        data: {
            code: body.code,
            description: body.description,
            image: body.image,
            name: body.name,
            price: body.price,
            subDescription: body.subDescription,
            category: body.category
        }
    });
}

async function findByCategory(category){
    return prisma.food.findMany({
        where: {
            category
        }
    });
}

const foodRepository = {
    findAllFood,
    findFoodByNameOrCode,
    findById,
    findByCategory,
    create
};

export default foodRepository;