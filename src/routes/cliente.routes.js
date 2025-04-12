const express = require('express');
const router = express.Router();
const ClienteService = require('../services/ClienteService');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware de autenticação para todas as rotas
router.use(authMiddleware);

// Rota para criar cliente
router.post('/', async (req, res) => {
    try {
        const cliente = await ClienteService.criarCliente(req.body);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para listar todos os clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await ClienteService.listarClientes();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para buscar cliente por ID
router.get('/:id', async (req, res) => {
    try {
        const cliente = await ClienteService.encontrarClientePorId(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para atualizar cliente
router.put('/:id', async (req, res) => {
    try {
        const cliente = await ClienteService.atualizarCliente(req.params.id, req.body);
        res.json(cliente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para deletar cliente
router.delete('/:id', async (req, res) => {
    try {
        await ClienteService.deletarCliente(req.params.id);
        res.json({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para listar clientes por status
router.get('/status/:status', async (req, res) => {
    try {
        const clientes = await ClienteService.listarClientesPorStatus(req.params.status);
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 