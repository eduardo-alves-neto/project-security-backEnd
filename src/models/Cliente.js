const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
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
  dataNascimento: Date,
  observacoes: String,
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cliente', clienteSchema); 