import request from 'supertest';

import { app } from '../../src/app.js';

test('GET /health deve retornar status 200 e um objeto com { status: "ok" }', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
});
