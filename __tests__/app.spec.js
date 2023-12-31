/* eslint-disable no-undef */
import httpStatus from 'http-status'
import app from '../src/app.js'
import supertest from 'supertest'

const server = supertest(app)

test('Test health', async () => {
    const response = await server.get('/health')

    expect(response.status).toBe(httpStatus.OK)
})
