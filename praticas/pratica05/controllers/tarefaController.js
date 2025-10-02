const tarefaModel = require('../models/tarefaModel');

const listar = (req, res) => {
  const resultado = tarefaModel.listar(); 
  res.json(resultado);
};


const buscarPeloId = (req, res) => {
  const tarefaId = req.params.tarefaId;
  const resultado = tarefaModel.buscarPeloId(tarefaId); 
  if (resultado !== null) { 
    return res.json(resultado);
  }
  res.status(404).json({ msg: 'Tarefa não encontrada' }); 
};


const criar = (req, res) => {
  const tarefa = req.body; 
  const resultado = tarefaModel.criar(tarefa); 
  res.status(201).json(resultado); 
};

const atualizar = (req, res) => {
  const tarefaId = req.params.tarefaId;
  const tarefa = req.body; 
  tarefa.id = tarefaId; 
  const resultado = tarefaModel.atualizar(tarefa); 
  if (resultado !== null) {
    return res.json(resultado);
  }
  res.status(404).json({ msg: 'Tarefa não encontrada' });
};

const remover = (req, res) => {
  const tarefaId = req.params.tarefaId;
  const resultado = tarefaModel.remover(tarefaId); 
  if (resultado !== null) { 
    return res.status(204).send();
  }
  res.status(404).json({ msg: 'Tarefa não encontrada' });
};

module.exports = {listar, buscarPeloId, criar, atualizar, remover};