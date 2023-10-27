import supertest from "supertest";
import app from "../src/app.js"
import { faker } from "@faker-js/faker"
import httpStatus from "http-status";

const server = supertest(app)

test('should return 204 when not exist name request', async () => {
    const response = await server.get(`/request?name=${faker.lorem.word()}`)

    expect(response.status).toBe(httpStatus.NO_CONTENT)
    expect(response.body).toHaveLength(0)
});

test('should return 204 when not exist code request', async () => {
    const response = await server.get(`/request?code=${faker.lorem.word()}`)

    expect(response.status).toBe(httpStatus.NO_CONTENT)
    expect(response.body).toHaveLength(0)
});

test('should return 200 when find all request', async () => {
    const response = await server.get('/request')

    expect(response.status).toBe(httpStatus.OK)
});