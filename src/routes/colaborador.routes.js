const express = require('express');
const router = express.Router();
const Colaborador = require('../models/Colaborador');
const { auth, adminAuth } = require('../middleware/auth');

// Listar todos os colaboradores (apenas admin)
router.get('/', adminAuth, async (req, res) => {
  try {
    const colaboradores = await Colaborador.find({ ativo: true });
    res.json(colaboradores);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar colaboradores', erro: error.message });
  }
});

// Buscar colaborador por ID (apenas admin)
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const colaborador = await Colaborador.findOne({ _id: req.params.id, ativo: true });
    if (!colaborador) {
      return res.status(404).json({ mensagem: 'Colaborador não encontrado' });
    }
    res.json(colaborador);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar colaborador', erro: error.message });
  }
});

// Criar novo colaborador (apenas admin)
router.post('/', adminAuth, async (req, res) => {
  try {
    const colaborador = new Colaborador(req.body);
    await colaborador.save();
    res.status(201).json(colaborador);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar colaborador', erro: error.message });
  }
});

// Atualizar colaborador (apenas admin)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const colaborador = await Colaborador.findOneAndUpdate(
      { _id: req.params.id, ativo: true },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!colaborador) {
      return res.status(404).json({ mensagem: 'Colaborador não encontrado' });
    }
    
    res.json(colaborador);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar colaborador', erro: error.message });
  }
});

// Excluir colaborador (soft delete, apenas admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const colaborador = await Colaborador.findOneAndUpdate(
      { _id: req.params.id, ativo: true },
      { ativo: false },
      { new: true }
    );
    
    if (!colaborador) {
      return res.status(404).json({ mensagem: 'Colaborador não encontrado' });
    }
    
    res.json({ mensagem: 'Colaborador excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir colaborador', erro: error.message });
  }
});

module.exports = router; 