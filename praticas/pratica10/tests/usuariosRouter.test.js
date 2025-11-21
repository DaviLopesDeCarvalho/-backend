const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
let userId;
let token;

describe('POST /usuarios', () => {
  it('deve criar um usuário e retornar 201', async () => {
    const response = await request.post('/usuarios').send({ email: 'usuario@email.com', senha: 'abcd1234' });
    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id');
    expect(response.body.email).toBe('usuario@email.com');
    userId = response.body._id;
  });

  it('deve retornar 422 sem JSON', async () => {
    const response = await request.post('/usuarios');
    expect(response.status).toBe(422);
    expect(response.body.msg).toBe('Email e Senha são obrigatórios');
  });
});

describe('POST /usuarios/login', () => {
  it('deve logar e retornar 200 com token', async () => {
    const response = await request.post('/usuarios/login').send({ usuario: 'usuario@email.com', senha: 'abcd1234' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  it('deve retornar 401 sem JSON', async () => {
    const response = await request.post('/usuarios/login');
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('Credenciais inválidas');
  });
});

describe('POST /usuarios/renovar', () => {
  it('deve renovar token e retornar 200', async () => {
    const response = await request.post('/usuarios/renovar').set('authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('deve retornar 401 com token inválido', async () => {
    const response = await request.post('/usuarios/renovar').set('authorization', 'Bearer 123456789');
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('Token inválido');
  });
});

describe('DELETE /usuarios/:id', () => {
  it('deve deletar usuário e retornar 204', async () => {
    const response = await request.delete(`/usuarios/${userId}`).set('authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
  });
});