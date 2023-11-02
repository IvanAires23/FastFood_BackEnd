/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app.js';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';

const server = supertest(app);

describe('GET /food', () => {
    test('should return 204 when not exist name food', async () => {
        const response = await server.get(`/food?name=${faker.lorem.word()}`);

        expect(response.status).toBe(httpStatus.NO_CONTENT);
        expect(response.body).toHaveLength(0);
    });

    test('should return 204 when not exist code food', async () => {
        const response = await server.get(`/food?code=${faker.lorem.word()}`);

        expect(response.status).toBe(httpStatus.NO_CONTENT);
        expect(response.body).toHaveLength(0);
    });

    test('should return 200 when find all food', async () => {
        const response = await server.get('/food');

        expect(response.status).toBe(httpStatus.OK);
    });
});
