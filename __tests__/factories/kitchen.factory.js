import { faker } from '@faker-js/faker'
import prisma from '../../src/config/database.js'

async function createKitchen(StatusPreparation, foodId) {
    return prisma.kitchen.create({
        data: {
            change: faker.number.int({min: 10, max: 50}),
            nameUser: faker.person.firstName(),
            payment: 'MONEY',
            preparation: StatusPreparation,
            foodId,
            quant: faker.number.int({ max: 50 }),
        },
    })
}

export default createKitchen
