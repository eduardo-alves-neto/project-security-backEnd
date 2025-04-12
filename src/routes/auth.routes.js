const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const { auth } = require("../middleware/auth");

router.post("/registro", async (req, res) => {
  try {
    const { email, senha, nome, role } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const usuario = new Usuario({
      email,
      senha,
      nome,
      role: role || "colaborador",
    });

    await usuario.save();

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      mensagem: "Usuário criado com sucesso",
      token,
      usuario: {
        id: usuario._id,
        email: usuario.email,
        nome: usuario.nome,
        role: usuario.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao criar usuário", erro: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    const senhaValida = await usuario.compararSenha(senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      mensagem: "Login realizado com sucesso",
      token,
      usuario: {
        id: usuario._id,
        email: usuario.email,
        nome: usuario.nome,
        role: usuario.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao fazer login", erro: error.message });
  }
});

router.get("/perfil", auth, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-senha");
    res.json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao buscar perfil", erro: error.message });
  }
});

module.exports = router;
