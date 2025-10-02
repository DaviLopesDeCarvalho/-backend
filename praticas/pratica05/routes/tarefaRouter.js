var express = require('express');
var router = express.Router();

var tarefaController = require('../controllers/tarefaController'); 


router.get('/', tarefaController.listar);

router.get('/:tarefaId', tarefaController.buscarPeloId);

router.post('/', tarefaController.criar);

router.put('/:tarefaId', tarefaController.atualizar);

router.delete('/:tarefaId', tarefaController.remover);

module.exports = router;