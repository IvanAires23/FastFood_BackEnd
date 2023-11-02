import prisma from '../../src/config/database.js'

async function cleanDB() {
    prisma.kitchen.deleteMany()
    prisma.food.deleteMany()
}

export default cleanDB
