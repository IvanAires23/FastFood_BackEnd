import { faker } from '@faker-js/faker';
import prisma from '../../src/config/database';

async function createKitchen(StatusPreparation){
    return prisma.kitchen.create({
        data:{
            change: faker.finance.amount(5, 10),
            nameUser: faker.person.firstName(),
            payment: 'MONEY',
            preparation: StatusPreparation,
            foodId: faker.number.int({max: 10}),
        }
    });
}

export default createKitchen;