const express = require('express');
const router = express.Router();
const ColaboradorService = require('../services/ColaboradorService');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware de autenticação para todas as rotas
router.use(authMiddleware);

// Rota para criar colaborador
router.post('/', async (req, res) => {
    try {
        const colaborador = await ColaboradorService.criarColaborador(req.body);
        res.status(201).json(colaborador);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para listar todos os colaboradores
router.get('/', async (req, res) => {
    try {
        const colaboradores = await ColaboradorService.listarColaboradores();
        res.json(colaboradores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para buscar colaborador por ID
router.get('/:id', async (req, res) => {
    try {
        const colaborador = await ColaboradorService.encontrarColaboradorPorId(req.params.id);
        if (!colaborador) {
            return res.status(404).json({ message: 'Colaborador não encontrado' });
        }
        res.json(colaborador);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para atualizar colaborador
router.put('/:id', async (req, res) => {
    try {
        const colaborador = await ColaboradorService.atualizarColaborador(req.params.id, req.body);
        res.json(colaborador);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para deletar colaborador
router.delete('/:id', async (req, res) => {
    try {
        await ColaboradorService.deletarColaborador(req.params.id);
        res.json({ message: 'Colaborador deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para listar colaboradores por status
router.get('/status/:status', async (req, res) => {
    try {
        const colaboradores = await ColaboradorService.listarColaboradoresPorStatus(req.params.status);
        res.json(colaboradores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para listar colaboradores por cargo
router.get('/cargo/:cargo', async (req, res) => {
    try {
        const colaboradores = await ColaboradorService.listarColaboradoresPorCargo(req.params.cargo);
        res.json(colaboradores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 