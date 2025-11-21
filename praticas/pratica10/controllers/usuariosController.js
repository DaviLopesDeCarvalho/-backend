const { cifrarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddleware');
const usuariosModel = require('../models/usuariosModel');

async function criar(req, res) {
    console.log('Dados recebidos:', req.body);
    try {
      const senhaCifrada = cifrarSenha(req.body.senha);
      console.log('Senha cifrada:', senhaCifrada);
      const novoUsuario = await usuariosModel.create({ email: req.body.email, senha: senhaCifrada });
      console.log('Usuário criado:', novoUsuario);
      res.status(201).json({ _id: novoUsuario._id, email: novoUsuario.email });
    } catch (err) {
      console.error('Erro ao criar usuário:', err.message);
      res.status(422).json({ msg: 'Email e Senha são obrigatórios' });
    }
  }

async function entrar(req, res) {
    try {
      const usuarioEncontrado = await usuariosModel.findOne({ email: req.body.usuario });
      if (usuarioEncontrado && compararSenha(req.body.senha, usuarioEncontrado.senha)) {
        const token = gerarToken({ email: req.body.usuario });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ msg: 'Credenciais inválidas' });
      }
    } catch (err) {
      res.status(401).json({ msg: 'Credenciais inválidas' });
    }
  }

  async function renovar(req, res) {
    const token = gerarToken({ email: req.usuario.email });
    res.status(200).json({ token });
  }

  async function remover(req, res) {
    await usuariosModel.findOneAndDelete({ _id: req.params.id });
    res.status(204).send();
  }

module.exports = { criar, entrar, renovar, remover };