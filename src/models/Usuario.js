const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'colaborador'],
    default: 'colaborador'
  }
}, {
  timestamps: true
});


usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});


usuarioSchema.methods.compararSenha = async function(senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('Usuario', usuarioSchema); 