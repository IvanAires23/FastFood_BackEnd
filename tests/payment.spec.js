import supertest from "supertest";
import app from "../src/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";

const server = supertest(app)

test('should return 400 when not send data payments', async () => {
    const response = await server.post('/payment')
        .send({})

    expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED)
    expect(response.body).toEqual(expect.arrayContaining([
        "\"formPayment\" is required",
        "\"name\" is required"
    ]));
});

test('should return 400 when not send name', async () => {
    const response = await server.post('/payment')
        .send({
            formPayment: "CREDIT",
            codeRequest: faker.number.int({ max: 1000 }),
            codeFood: faker.number.int({ max: 1000 })
        })

    expect(response.status).toBe(httpStatus.BAD_REQUEST)
    expect(response.body).toEqual(expect.arrayContaining([
        "\"name\" is required"
    ]));
});

test('should return 400 when not select form payment', async () => {
    const response = await server.post('/payment')
        .send({
            name: faker.person.firstName(),
            codeRequest: faker.number.int({ max: 1000 }),
            codeFood: faker.number.int({ max: 1000 })
        })

    expect(response.status).toBe(httpStatus.BAD_REQUEST)
    expect(response.body).toEqual(expect.arrayContaining([
        "\"formPayment\" is required"
    ]));
});

test('should return 201 when request food confirmed', async () => {
    const response = await server.post('/payment')
        .send({
            formPayment: "CREDIT",
            name: faker.person.firstName(),
            codeRequest: faker.number.int({ max: 1000 }),
            codeFood: faker.number.int({ max: 1000 })
        })

    expect(response.status).toBe(httpStatus.CREATED)
})