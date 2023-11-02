import { faker } from '@faker-js/faker';
import prisma from '../../src/config/database.js';

export default function createFood(){
    return prisma.food.create({
        data:{
            category: 'COMBOS',
            code: '200',
            description: faker.lorem.words(10),
            image: faker.internet.url(),
            name: faker.commerce.product(),
            price: faker.number.int({max: 10000}),
            subDescription: faker.lorem.words(3),
        }
    });
}