import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import httpStatus from 'http-status'
import app from '../src/app.js'
import createFood from './factories/food.fatory.js'
import cleanDB from './helpers/cleanDb.js'

const server = supertest(app)

beforeEach(async () => {
    await cleanDB()
})

test('should return 201 when request food confirmed', async () => {
    const food = await createFood()

    const response = await server.post('/printer').send({
        payment: 'CREDIT',
        change: faker.number.int({max: 10}),
        name: faker.person.firstName(),
        valueDelivered: faker.finance.amount(20, 30),
        foodId: food.id,
        quant: faker.number.int({ max: 50 }),
        adds: []
    })
    expect(response.status).toBe(httpStatus.CREATED)
})