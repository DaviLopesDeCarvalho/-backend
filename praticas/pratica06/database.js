const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://usrTarefas:abcd1234@davilopesdecarvalho.dft6m6n.mongodb.net/?appName=DaviLopesdeCarvalho';

const client = new MongoClient(url);

async function conectarDb() {
  try {
    await client.connect();
    return client.db('agenda');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}

module.exports = { conectarDb };