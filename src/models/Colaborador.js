const mongoose = require('mongoose');

const colaboradorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  telefone: {
    type: String,
    required: true
  },
  cargo: {
    type: String,
    required: true
  },
  departamento: {
    type: String,
    required: true
  },
  dataAdmissao: {
    type: Date,
    required: true
  },
  salario: {
    type: Number,
    required: true
  },
  endereco: {
    rua: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String,
    cep: String
  },
  cpf: {
    type: String,
    required: true,
    unique: true
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Colaborador', colaboradorSchema); 