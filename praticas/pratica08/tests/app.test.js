const request = require('supertest');
const app = require('../app');

describe('GET /produtos', () => {
  it('deve retornar 401 sem token', async () => {
    const response = await request(app).get('/produtos');
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('msg', 'Não autorizado');
  });

  it('deve retornar 401 com token inválido', async () => {
    const response = await request(app).get('/produtos').set('authorization', '123456789');
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('msg', 'Token inválido');
  });

  it('deve retornar 200 com token válido', async () => {
    const loginResponse = await request(app)
      .post('/usuarios/login')
      .send({ usuario: 'davi@iesb.br', senha: 'abcd1234' });
    const token = loginResponse.body.token;

    const response = await request(app).get('/produtos').set('authorization', token);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });

  it('deve retornar 200 com novo token', async () => {
    const loginResponse = await request(app)
      .post('/usuarios/login')
      .send({ usuario: 'davi@iesb.br', senha: 'abcd1234' });
    const token = loginResponse.body.token;

    const renewResponse = await request(app)
      .post('/usuarios/renovar')
      .set('authorization', token);
    const newToken = renewResponse.body.token;

    const response = await request(app).get('/produtos').set('authorization', newToken);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });
});

describe('POST /usuarios/login', () => {
  it('deve retornar 200 e token', async () => {
    const response = await request(app).post('/usuarios/login').send({ usuario: 'davi@iesb.br', senha: 'abcd1234' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});

describe('POST /usuarios/renovar', () => {
  it('deve retornar 200 e novo token', async () => {
    const loginResponse = await request(app)
      .post('/usuarios/login')
      .send({ usuario: 'davi@iesb.br', senha: 'abcd1234' });
    const tempToken = loginResponse.body.token;

    const response = await request(app).post('/usuarios/renovar').set('authorization', tempToken);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
