import request from 'supertest';

import { app } from '../../src/app.js';

test('GET /home deve retornar status 200 e o resultado ser um array', async () => {
    const res = await request(app).get('/home');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
});
