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
            .send({ code: faker.number.int({ min: 100, max: 1000 }) })

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

        expect(response.status).toBe(httpStatus.NOT_FOUND)
        expect(response.body).toEqual({
            name: 'notFound',
            message: 'Not Found Food',
        })
    })
})
