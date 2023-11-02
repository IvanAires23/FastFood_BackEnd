/* eslint-disable no-undef */
import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import httpStatus from 'http-status'
import app from '../src/app.js'
import createFood from './factories/food.fatory.js'
import cleanDB from './helpers/cleanDb.js'
import createKitchen from './factories/kitchen.factory.js'

const server = supertest(app)

beforeEach(async () => {
    await cleanDB()
})

describe('POST /kitchen', () => {
    test('should return 400 when not send data payments', async () => {
        const response = await server.post('/kitchen').send({})

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
        expect(response.body).toEqual(
            expect.arrayContaining([
                '"money" is required',
                '"payment" is required',
                '"name" is required',
                '"foodId" is required',
                '"change" is required',
            ])
        )
    })

    test('should return 400 when not send name', async () => {
        const response = await server.post('/kitchen').send({
            payment: 'CREDIT',
            foodId: faker.number.int({ max: 100 }),
            money: faker.number.int({ max: 100 }),
            change: faker.finance.amount(5, 10),
        })

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
        expect(response.body).toEqual(
            expect.arrayContaining(['"name" is required'])
        )
    })

    test('should return 400 when not select form payment', async () => {
        const response = await server.post('/kitchen').send({
            name: faker.person.firstName(),
            foodId: faker.number.int({ max: 100 }),
            money: faker.number.int({ max: 100 }),
            change: faker.finance.amount(5, 10),
        })

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
        expect(response.body).toEqual(
            expect.arrayContaining(['"payment" is required'])
        )
    })

    test('should return 404 when not found food', async () => {
        const response = await server.post('/kitchen').send({
            payment: 'CREDIT',
            name: faker.person.firstName(),
            foodId: faker.number.int({ max: 100 }),
            money: faker.finance.amount({ max: 10000 }),
            change: faker.finance.amount(5, 10),
        })
        expect(response.status).toBe(httpStatus.NOT_FOUND)
        expect(response.body).toEqual({
            name: 'notFound',
            message: 'Food not found',
        })
    })

    test('should return 201 when request food confirmed', async () => {
        const food = await createFood()

        const response = await server.post('/kitchen').send({
            payment: 'CREDIT',
            name: faker.person.firstName(),
            foodId: food.id,
            money: faker.finance.amount({ max: 10000 }),
            change: faker.finance.amount(5, 10),
        })
        expect(response.status).toBe(httpStatus.CREATED)
    })
})

describe('/GET kitchen', () => {
    test('should return 400 when asked to prepare a ready order', async () => {
        const kitchen = await createKitchen('READY')

        const response = await server.post('/kitchen/ready').send({
            kitchenId: kitchen.id,
        })

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
    })

    test('should return 404 when mot found food', async () => {
        const response = await server.post('/kitchen/1')

        expect(response.status).toBe(httpStatus.NOT_FOUND)
    })

    test('should return 200 when find all kitchen', async () => {
        await createKitchen()

        const response = await server.get('/kitchen')

        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).toHaveLength(1)
    })
})
