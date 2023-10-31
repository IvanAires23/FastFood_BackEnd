import { faker } from '@faker-js/faker';
import prisma from '../../src/config/database';

async function createKitchen(){
    return prisma.kitchen.create({
        data:{
            change: faker.finance.amount(5, 10),
            nameUser: faker.person.firstName(),
            payment: 'MONEY',
            preparation: 'PEDDING',
            foodId: faker.number.int({max: 10}),
        }
    });
}

export default createKitchen;