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

describe('GET /food', () => {
    test('should return 200 when find all food', async () => {
        await createFood()

        const response = await server.get('/food')

        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).toHaveLength(1)
    })
})

describe('POST /food', () => {
    test('should return 400 when send body incorrect', async () => {
        const response = await server.post('/food/create').send({})

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
        expect(response.body).toEqual([
            '"code" is required',
            '"description" is required',
            '"image" is required',
            '"name" is required',
            '"price" is required',
            '"subDescription" is required',
            '"category" is required',
        ])
    })

    test('should return 400 when not send code', async () => {
        const response = await server.post('/food').send({})

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
        expect(response.body).toEqual(['"code" is required'])
    })

    test('should return 404 when not found food by name', async () => {
        const response = await server
            .post('/food')
            .send({ code: faker.lorem.word() })

        expect(response.status).toBe(httpStatus.NOT_FOUND)
        expect(response.body).toEqual({
            name: 'notFound',
            message: 'Not Found Food',
        })
    })

    test('should return 404 when not found food by code', async () => {
        const response = await server
            .post('/food')
            .send({ code: faker.finance.amount(100, 1000, 0) })

        expect(response.status).toBe(httpStatus.NOT_FOUND)
        expect(response.body).toEqual({
            name: 'notFound',
            message: 'Not Found Food',
        })
    })

    test('should return 404 when not found food by category', async () => {
        const response = await server
            .post('/food/category')
            .send({ category: faker.lorem.word() })

        expect(response.status).toBe(httpStatus.BAD_REQUEST)
    })

    test('should return 200 when find food by code or name', async () => {
        const food = await createFood()

        const response = await server.post('/food').send({ code: food.code })

        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).toHaveLength(1)
    })

    test('should return 201 when create food', async () => {
        const response = await server.post('/food/create').send({
            code: faker.finance.amount(100, 1000, 0),
            description: faker.lorem.words(10),
            image: faker.image.url(),
            name: faker.lorem.word(),
            price: faker.number.int({max: 100}),
            subDescription: faker.lorem.words(3),
            category: 'COMBOS',
        })

        expect(response.status).toBe(httpStatus.CREATED)
    })

    test('should return 200 when find food category', async () => {
        const food = await createFood()

        const response = await server.post('/food/category').send({ category: food.category })

        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).toHaveLength(1)
    })

})
