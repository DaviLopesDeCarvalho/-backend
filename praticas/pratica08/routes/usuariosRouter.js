const express = require('express');
const { gerarToken, verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', (req, res) => {
  try {
    const token = gerarToken({ email: req.body.usuario });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Erro interno' });
  }
});

router.post('/renovar', verificarToken, (req, res) => {
  try {
    const token = gerarToken({ email: req.usuario.email });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Erro interno' });
  }
});

module.exports = router;