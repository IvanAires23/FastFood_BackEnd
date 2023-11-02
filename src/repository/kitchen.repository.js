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

async function findAll() {
    return prisma.kitchen.findMany()
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
    findAll,
    findKitchenById,
    deleteKitchen,
}

export default kitchenRepository
