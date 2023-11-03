import prisma from '../config/database.js'

async function create(body) {
    return prisma.kitchen.create({
        data: {
            nameUser: body.name,
            preparation: 'PREPARING',
            foodId: body.foodId,
            observation: body.observation,
            change: body.change,
            payment: body.payment,
            quant: body.quant,
        },
    })
}

async function findPreparing() {
    return prisma.kitchen.findMany({
        where: {
            preparation: 'PREPARING'
        }, include: {
            Food: true
        }
    })
}

async function findReady() {
    return prisma.kitchen.findMany({
        where: {
            preparation: 'READY'
        }, include: {
            Food: true
        }
    })
}

async function findKitchenById(id) {
    return prisma.kitchen.findFirst({ where: { id } })
}

async function readyKitchen(id) {
    return prisma.kitchen.update({
        where: {
            id,
        },
        data: {
            preparation: 'READY',
        },
    })
}

async function deleteKitchen(id) {
    return prisma.kitchen.delete({
        where: {
            id,
        },
    })
}

const kitchenRepository = {
    create,
    readyKitchen,
    findPreparing,
    findReady,
    findKitchenById,
    deleteKitchen,
}

export default kitchenRepository
