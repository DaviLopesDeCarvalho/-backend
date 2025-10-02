const request = require("supertest");
const app = require("../app");

describe("API de Tarefas", () => {
  let tarefaId;

  test("GET /tarefas retorna status 200 e JSON", async () => {
    const response = await request(app)
      .get("/tarefas")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /tarefas cria uma tarefa e retorna 201 com JSON", async () => {
    const response = await request(app)
      .post("/tarefas")
      .send({ nome: "Estudar Node", concluida: false })
      .expect(201)
      .expect("Content-Type", /json/);
    tarefaId = response.body.id;
    expect(response.body).toHaveProperty("id");
  });

  test("GET /tarefas/:id retorna 200 e JSON para tarefa criada", async () => {
    const response = await request(app)
      .get(`/tarefas/${tarefaId}`)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.body.id).toBe(tarefaId);
  });

  test("GET /tarefas/1 retorna 404 e JSON", async () => {
    const response = await request(app)
      .get("/tarefas/1")
      .expect(404)
      .expect("Content-Type", /json/);
    expect(response.body).toHaveProperty("msg", "Tarefa não encontrada");
  });

  test("PUT /tarefas/:id atualiza e retorna 200 com JSON", async () => {
    const response = await request(app)
      .put(`/tarefas/${tarefaId}`)
      .send({ nome: "Estudar Node e Express", concluida: true })
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.body.id).toBe(tarefaId);
    expect(response.body.nome).toBe("Estudar Node e Express");
    expect(response.body.concluida).toBe(true);
  });

  test("PUT /tarefas/1 retorna 404 e JSON", async () => {
    const response = await request(app)
      .put("/tarefas/1")
      .send({ nome: "Invalid", concluida: false })
      .expect(404)
      .expect("Content-Type", /json/);
    expect(response.body).toHaveProperty("msg", "Tarefa não encontrada");
  });

  test("DELETE /tarefas/:id remove e retorna 204 sem conteúdo", async () => {
    return request(app).delete(`/tarefas/${tarefaId}`).expect(204).expect("");
  });

  test("DELETE /tarefas/1 retorna 404 e JSON", async () => {
    const response = await request(app)
      .delete("/tarefas/1")
      .expect(404)
      .expect("Content-Type", /json/);
    expect(response.body).toHaveProperty("msg", "Tarefa não encontrada");
  });
});
