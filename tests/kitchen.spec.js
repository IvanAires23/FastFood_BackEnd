/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import createFood from './factories/food.fatory';
import cleanDB from './helpers/cleanDb';

const server = supertest(app);

beforeEach(async () => {
    await cleanDB();
});

describe('POST /kitchen', () => {
    test('should return 400 when not send data payments', async () => {
        const response = await server.post('/kitchen')
            .send({});
    
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
        expect(response.body).toEqual(expect.arrayContaining([
            '"money" is required',
            '"payment" is required',
            '"name" is required',
            '"foodId" is required',
        ]));
    });
    
    test('should return 400 when not send name', async () => {
        const response = await server.post('/kitchen')
            .send({
                payment: 'CREDIT',
                foodId: faker.number.int({max: 100}),
                money: faker.number.int({max: 100}),
            });
    
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
        expect(response.body).toEqual(expect.arrayContaining([
            '"name" is required'
        ]));
    });
    
    test('should return 400 when not select form payment', async () => {
        const response = await server.post('/kitchen')
            .send({
                name: faker.person.firstName(),
                foodId: faker.number.int({max: 100}),
                money: faker.number.int({max: 100}),
            });
    
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
        expect(response.body).toEqual(expect.arrayContaining([
            '"payment" is required'
        ]));
    });
    
    test('should return 201 when request food confirmed', async () => {
        const food = await createFood();

        const response = await server.post('/kitchen')
            .send({
                payment: 'CREDIT',
                name: faker.person.firstName(),
                foodId: food.id,
                money: faker.finance.amount({max:10000}),
            });
        console.log(response.body);
        expect(response.status).toBe(httpStatus.CREATED);
    });
});