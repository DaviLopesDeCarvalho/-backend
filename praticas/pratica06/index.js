const readline = require('readline-sync');
const controlador = require('./controlador');

function menu() {
  console.log('Menu:');
  console.log('1. Adicionar tarefa');
  console.log('2. Buscar tarefa');
  console.log('3. Atualizar tarefa');
  console.log('4. Remover tarefa');
  console.log('5. Sair');
}

async function escolherOpcao(opcao) {
  switch (opcao) {
    case '1':
      const nomeAdd = readline.question('Digite o nome da tarefa: ');
      await controlador.adicionarTarefa(nomeAdd);
      console.log('Tarefa adicionada!');
      break;
    case '2':
      const nomeBusca = readline.question('Digite o nome da tarefa: ');
      const tarefa = await controlador.buscarTarefa(nomeBusca);
      if (tarefa.id) {
        console.log(`Nome: ${tarefa.nome}, Concluída: ${tarefa.concluida}`);
      } else {
        console.log('Tarefa não encontrada.');
      }
      break;
    case '3':
      const nomeUpdate = readline.question('Digite o nome da tarefa: ');
      const concluidaUpdate = readline.question('Digite se está concluída (true/false): ') === 'true';
      await controlador.atualizarTarefa(nomeUpdate, concluidaUpdate);
      console.log('Tarefa atualizada!');
      break;
    case '4':
      const nomeRemove = readline.question('Digite o nome da tarefa: ');
      await controlador.removerTarefa(nomeRemove);
      console.log('Tarefa removida!');
      break;
    case '5':
      process.exit();
      break;
    default:
      console.log('Opção inválida.');
  }
}

async function main() {
  while (true) {
    menu();
    const opcao = readline.question('Escolha uma opção: ');
    await escolherOpcao(opcao);
  }
}

main();