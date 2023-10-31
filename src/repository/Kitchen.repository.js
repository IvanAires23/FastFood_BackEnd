import prisma from '../config/database';

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

const kitchenRepository = {
    create
};

export default kitchenRepository;