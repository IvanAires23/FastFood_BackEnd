/* eslint-disable no-undef */
const supertest = require('supertest');
import app from '../src/app';
import httpStatus from 'http-status';

const server = supertest(app);

test('Test health', async () => {
    const response = await server.get('/health');

    expect(response.status).toBe(httpStatus.OK);
});