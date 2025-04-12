const express = require("express");
const router = express.Router();
const UsuarioService = require("../services/UsuarioService");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const usuario = await UsuarioService.registrar(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const resultado = await UsuarioService.autenticar(email, senha);
    res.json(resultado);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const usuario = await UsuarioService.encontrarUsuarioPorId(req.usuario.id);
    res.json(usuario);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const usuario = await UsuarioService.atualizarUsuario(req.usuario.id, req.body);
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/profile", authMiddleware, async (req, res) => {
  try {
    await UsuarioService.deletarUsuario(req.usuario.id);
    res.json({ message: "Conta deletada com sucesso" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
