let tarefas = []; 

const listar = () => {
  return tarefas; 
};

const buscarPeloId = (tarefaId) => {
  const encontrada = tarefas.find(t => t.id === tarefaId); 
  return encontrada || null; 
};


const criar = (tarefa) => {
  const novoId = Math.random().toString(36).substr(2, 4);
  const novaTarefa = { id: novoId, ...tarefa };
  tarefas.push(novaTarefa);
  return novaTarefa;
};

const atualizar = (tarefaAtualizada) => {
  const index = tarefas.findIndex(t => t.id === tarefaAtualizada.id);
  if (index !== -1) {
    tarefas[index] = { ...tarefas[index], ...tarefaAtualizada };
    return tarefas[index];
  }
  return null;
};


const remover = (tarefaId) => {
  const index = tarefas.findIndex(t => t.id === tarefaId);
  if (index !== -1) {
    const removida = tarefas.splice(index, 1)[0];
    return removida;
  }
  return null;
};

module.exports = {listar, buscarPeloId, criar, atualizar,remover};