/* eslint-disable no-undef */
import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import httpStatus from 'http-status'
import app from '../src/app.js'
import cleanDB from './helpers/cleanDb.js'
import createFood from './factories/food.fatory.js'

const server = supertest(app)

beforeEach(async () => {
    await cleanDB()
})

describe('GET /food', () => {
    test('should return 204 when not exist name food', async () => {
        const response = await server.get(`/food?name=${faker.lorem.word()}`)

        expect(response.status).toBe(httpStatus.NO_CONTENT)
        expect(response.body).toHaveLength(0)
    })

    test('should return 204 when not exist code food', async () => {
        const response = await server.get(`/food?code=${faker.lorem.word()}`)

        expect(response.status).toBe(httpStatus.NO_CONTENT)
        expect(response.body).toHaveLength(0)
    })

    test('should return 200 when find all food', async () => {
        await createFood()

        const response = await server.get('/food')

        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).toHaveLength(1)
    })
})

describe('POST /food', () => {
    test('should return 404 when not found food by category', async () => {
        const response = await server
            .post('/food/category')
            .send({ category: faker.lorem.word() })

        expect(response.status).toBe(httpStatus.NOT_FOUND)
        expect(response.body).toEqual({
            name: 'notFound',
            message: 'Not Found Food',
        })
    })
})
