const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const { auth, adminAuth } = require('../middleware/auth');

// Listar todos os clientes
router.get('/', auth, async (req, res) => {
  try {
    const clientes = await Cliente.find({ ativo: true });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar clientes', erro: error.message });
  }
});

// Buscar cliente por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const cliente = await Cliente.findOne({ _id: req.params.id, ativo: true });
    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar cliente', erro: error.message });
  }
});

// Criar novo cliente
router.post('/', auth, async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar cliente', erro: error.message });
  }
});

// Atualizar cliente
router.put('/:id', auth, async (req, res) => {
  try {
    const cliente = await Cliente.findOneAndUpdate(
      { _id: req.params.id, ativo: true },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }
    
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar cliente', erro: error.message });
  }
});

// Excluir cliente (soft delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const cliente = await Cliente.findOneAndUpdate(
      { _id: req.params.id, ativo: true },
      { ativo: false },
      { new: true }
    );
    
    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }
    
    res.json({ mensagem: 'Cliente excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir cliente', erro: error.message });
  }
});

module.exports = router; 