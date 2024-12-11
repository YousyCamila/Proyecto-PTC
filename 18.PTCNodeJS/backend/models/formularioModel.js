const mongoose = require('mongoose');

const formularioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    maxlength: 100,
    required: true
  },
  numeroCelular: {
    type: String,
    maxlength: 15, // Ajustado para permitir números más largos si es necesario
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  fechaEnvio: {
    type: Date,
    default: Date.now, // Se establece la fecha por defecto a la fecha actual
    required: false
  },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: false
  },
  correoCliente: {
    type: String,
    required: true,
    match: /.+\@.+\..+/ // Valida el formato de correo electrónico
  },
  estado: {
    type: String,
    enum: ['pendiente', 'respondido'],
    default: 'pendiente',
  },
  respuesta: {  
    type: String,
    trim: true,  // Elimina espacios en los extremos
    minlength: 1, // Asegura que la respuesta tenga al menos un carácter significativo
    default: null // Respuesta del administrador
  }
}, { timestamps: true }); // Agrega timestamps para crear y actualizar automáticamente las fechas

module.exports = mongoose.model('Formulario', formularioSchema);
