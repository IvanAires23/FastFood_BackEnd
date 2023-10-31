import prisma from '../config/database.js';

async function create(body){
    return prisma.kitchen.create({
        data:{
            nameUser: body.name,
            preparation: 'PEDDING',
            foodId: body.foodId,
            observation: body.observation,
            change: body.change,
            payment: body.payment
        }
    });
}

async function findAll(){
    return prisma.kitchen.findMany();
}

const kitchenRepository = {
    create,
    findAll
};

export default kitchenRepository;