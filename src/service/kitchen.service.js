import notAcceptable from '../errors/notAcceptable.error.js'
import notFoundFood from '../errors/notFoundFood.error.js'
import notFoundKitchen from '../errors/notFoundKitchen.error.js'
import requestReady from '../errors/requestReady.error.js'
import foodRepository from '../repository/food.repository.js'
import kitchenRepository from '../repository/kitchen.repository.js'

async function create(body) {
    const food = await foodRepository.findById(body.foodId)
    if (!food) throw notFoundFood()
    const valueDelivery = parseInt(body.valueDelivery)
    if (!valueDelivery) throw notAcceptable()
    else if(valueDelivery < body.change) throw notAcceptable()

    const kitchen = await kitchenRepository.create(body)
    return kitchen
}

async function findFoodInKitchen(foodId) {
    const id = parseInt(foodId, 10)

    const food = await foodRepository.findById(id)
    if (!food) throw notFoundFood()

    return food
}

async function readyKitchen(id) {
    const kitchen = await kitchenRepository.findKitchenById(id)
    if (!kitchen) throw notFoundKitchen()
    else if (kitchen.preparation === 'READY') throw requestReady()

    const update = await kitchenRepository.readyKitchen(id)
    return update
}

async function deleteKitchen(id) {
    const kitchen = await kitchenRepository.findKitchenById(id)
    if (!kitchen) throw notFoundKitchen()

    const kitchenDeleted = await kitchenRepository.deleteKitchen(id)
    return kitchenDeleted
}

async function findAll() {
    const kitchen = await kitchenRepository.findAll()
    return kitchen
}

const kitchenService = {
    create,
    findFoodInKitchen,
    readyKitchen,
    deleteKitchen,
    findAll,
}

export default kitchenService
