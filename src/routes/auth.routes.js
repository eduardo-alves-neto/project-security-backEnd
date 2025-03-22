const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { auth } = require('../middleware/auth');

// Registro de usuário
router.post('/registro', async (req, res) => {
  try {
    const { email, senha, nome, role } = req.body;

    // Verifica se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: 'Email já cadastrado' });
    }

    // Cria novo usuário
    const usuario = new Usuario({
      email,
      senha,
      nome,
      role: role || 'colaborador'
    });

    await usuario.save();

    // Gera token
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      token,
      usuario: {
        id: usuario._id,
        email: usuario.email,
        nome: usuario.nome,
        role: usuario.role
      }
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar usuário', erro: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Busca usuário
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }

    // Verifica senha
    const senhaValida = await usuario.compararSenha(senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }

    // Gera token
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      mensagem: 'Login realizado com sucesso',
      token,
      usuario: {
        id: usuario._id,
        email: usuario.email,
        nome: usuario.nome,
        role: usuario.role
      }
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao fazer login', erro: error.message });
  }
});

// Rota protegida de exemplo
router.get('/perfil', auth, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-senha');
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar perfil', erro: error.message });
  }
});

module.exports = router; 