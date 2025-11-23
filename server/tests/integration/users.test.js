import request from 'supertest';

import { app } from '../../src/app.js';

test('GET /users deve retornar status 401 e mensagem de erro pois não há token de acesso', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('É preciso informar o token de acesso!');
});
