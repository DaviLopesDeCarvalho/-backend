const express = require('express');
  
const app = express();

app.use(express.json());

const tarefas = [  
    { id: 1, nome: "Estudar middleware", concluida: false },  
    { id: 2, nome: "Praticar Express", concluida: true }  
  ];

app.use((req, res, next) => {
console.log("Time:", Date.now(), " - ", req.method, " - ", req.url);
 next();

});

app.listen(3000, ()=>{
    console.log("Servidor rodando na porta 3000!")
})

module.exports = app;

const router = express.Router();

router.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

router.post('/tarefas', (req, res) => {
    const novaTarefa = {id : tarefas.length + 1, ...req.body };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

router.get('/tarefas/:id', (req, res) => {
    const tarefa = tarefas.find(t => t.id == req.params.id);
    if (!tarefa) return next(new Error("Tarefa não localizada"));
    res.json(tarefa);
});

router.put("/tarefas/:id", (req, res, next) => {
    const tarefa = tarefas.find(t => t.id == req.params.id);
    if (!tarefa) return next(new Error("Tarefa não localizada"));
    Object.assign(tarefa, req.body)
    res.json(tarefa);   
});

router.delete("/tarefas/:id", (req, res, next) => {
    const index = tarefas.findIndex(t => t.id == req.params.id);
    if (index === -1) return next(new Error("Tarefas não localizada"));
    tarefas.splice(index, 1);
    res.status(204).send();
});

app.use(router);

app.use((err, req, res, next) => {
    res.status(400).json({ erro: err.menssage });
});

