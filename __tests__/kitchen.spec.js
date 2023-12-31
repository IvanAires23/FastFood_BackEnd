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
                '"valueDelivered" is required',
                '"payment" is required',
                '"name" is required',
                '"foodId" is required',
                '"change" is required',
                '"quant" is required'
            ])
        )
    })

    test('should return 406 when send value money incorrect', async () => {
        const food = await createFood()
        const response = await server.post('/kitchen').send({
            name: faker.person.firstName(),
            foodId: food.id,
            valueDelivered: faker.lorem.word(),
            change: faker.finance.amount(5, 10),
            quant: faker.number.int({ max: 50 }),
            payment: 'MONEY',
            change: faker.number.int({max: 500})
        })

        expect(response.status).toBe(httpStatus.NOT_ACCEPTABLE)
        expect(response.body).toEqual({
            name: 'notAcceptable',
            message: 'Value delivered not acceptable'
        })
    })

    test('should return 406 when send name client incorrect', async () => {
        const food = await createFood()
        const response = await server.post('/kitchen').send({
            name: faker.finance.amount(5, 10),
            foodId: food.id,
            valueDelivered: faker.finance.amount(),
            change: faker.finance.amount(5, 10),
            quant: faker.number.int({ max: 50 }),
            payment: 'MONEY',
            change: faker.number.int({max: 500})
        })

        expect(response.status).toBe(httpStatus.NOT_ACCEPTABLE)
        expect(response.body).toEqual({
            name: 'notAcceptable',
            message: 'Do not use a number in the customer name',
        })
    })

    test('should return 406 when the amount delivered is less than the change', async () => {
        const food = await createFood()
        const response = await server.post('/kitchen').send({
            name: faker.person.firstName(),
            foodId: food.id,
            valueDelivered: faker.finance.accountNumber(3),
            quant: faker.number.int({ max: 50 }),
            payment: 'MONEY',
            change: faker.number.int({min: 1000, max: 1200}),
            adds: []
        })

        expect(response.status).toBe(httpStatus.NOT_ACCEPTABLE)
        expect(response.body).toEqual({
            name: 'notAcceptable',
            message: 'Value delivered not acceptable'
        })
    })

    test('should return 400 when not send name', async () => {
        const response = await server.post('/kitchen').send({
            payment: 'CREDIT',
            foodId: faker.number.int({ max: 100 }),
            valueDelivered: faker.finance.amount(51, 100, 0),
            change: faker.number.int({max:50}),
            quant: faker.number.int({ max: 50 }),
        })

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
        expect(response.body).toEqual(['"name" is required'])
    })

    test('should return 400 when not select form payment', async () => {
        const response = await server.post('/kitchen').send({
            name: faker.person.firstName(),
            foodId: faker.number.int({ max: 100 }),
            valueDelivered: faker.finance.amount(100, 1000),
            change: faker.number.int({max: 500}),
            quant: faker.number.int({ max: 50 }),
        })

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
        expect(response.body).toEqual(['"payment" is required'])
    })

    test('should return 404 when not found food', async () => {
        const response = await server.post('/kitchen').send({
            payment: 'CREDIT',
            change: faker.number.int({min: 10, max: 50}),
            name: faker.person.firstName(),
            payment: 'MONEY',
            valueDelivered: faker.finance.amount(20, 30),
            foodId: faker.number.int({ max: 10 }),
            quant: faker.number.int({ max: 50 }),
        })
        expect(response.status).toBe(httpStatus.NOT_FOUND)
        expect(response.body).toEqual({
            name: 'notFound',
            message: 'Not Found Food' 
        })
    })

    test('should return 201 when request food confirmed', async () => {
        const food = await createFood()

        const response = await server.post('/kitchen').send({
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
})

describe('/POST kitchen/ready', () => {
    test('should return 400 when asked to prepare a ready order', async () => {
        const food = await createFood()
        const kitchen = await createKitchen('READY', food.id)

        const response = await server.post('/kitchen/ready').send({
            id: kitchen.id,
        })

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
    })

    test('should return 404 when not found kitchen', async () => {
        const response = await server.post('/kitchen/ready').send({
            id: faker.number.int({ max: 10 }),
        })

        expect(response.status).toBe(httpStatus.NOT_FOUND)
        expect(response.body).toEqual({
            name: 'notFound',
            message: 'Not found kitchen'
        })
    })

    test('should return 200 when updated in kitchen', async () => {
        const food = await createFood()
        const kitchen = await createKitchen('PREPARING', food.id)

        const response = await server.post('/kitchen/ready').send({
            id: kitchen.id,
        })

        expect(response.status).toBe(httpStatus.OK)
    })

})

describe('/POST kitchen/delete', () => {
    test('should return 404 when not found kitchen', async () => {
        const response = await server.post('/kitchen/delete').send({
            id: faker.number.int({max: 10}),
        })

        expect(response.status).toBe(httpStatus.NOT_FOUND)
        expect(response.body).toEqual({
            name: 'notFound',
            message: 'Not found kitchen'
        })
    })

    test('should return 200 when deleted kitchen', async () => {
        const food = await createFood()
        const kitchen = await createKitchen('PREPARING', food.id)

        const response = await server.post('/kitchen/delete').send({
            id: kitchen.id,
        })

        expect(response.status).toBe(httpStatus.OK)
    })

})

describe('/GET kitchen/:foodId', () => {
    test('should return 404 when not found kitchen', async () => {

        const response = await server.get(`/kitchen/${faker.number.int({max: 10})}`)

        expect(response.status).toBe(httpStatus.NOT_FOUND)
        expect(response.body).toEqual({
        name: 'notFound',
        message: 'Not Found Food'
        })
    })

    test('should return 200 when find food in kitchen', async () => {
        const food = await createFood()
        await createKitchen('PREPARING', food.id)

        const response = await server.get(`/kitchen/${food.id}`)

        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).toEqual(food)
    })

})

describe('/GET kitchen', () => {

    test('should return 200 when find foods in preparing in kitchen', async () => {
        const food = await createFood()
        await createKitchen('PREPARING', food.id)

        const response = await server.get('/kitchen/preparing')

        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).toHaveLength(1)
    })

    test('should return 200 when find foods ready in kitchen', async () => {
        const food = await createFood()
        await createKitchen('READY', food.id)

        const response = await server.get('/kitchen/ready')

        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).toHaveLength(1)
    })
})
