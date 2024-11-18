const Caso = require('../models/casoModel');
const Cliente = require('../models/clienteModel');
const Detective = require('../models/detectiveModel');

async function crearCaso(datos) {
  // Verificar que el nombre del caso esté permitido
  const nombresPermitidos = [
    'cadenaCustodia',
    'investigacionExtorsion',
    'estudiosSeguridad',
    'investigacionInfidelidades',
    'investigacionRobosEmpresariales',
    'antecedentes',
    'recuperacionVehiculos'
  ];
  
  if (!nombresPermitidos.includes(datos.nombreCaso)) {
    throw new Error(`El nombre del caso "${datos.nombreCaso}" no está permitido.`);
  }

  // Verificar si ya existe un caso para el mismo cliente y detective
  const casoExistente = await Caso.findOne({
    idCliente: datos.idCliente,
    idDetective: datos.idDetective,
    nombreCaso: datos.nombreCaso
  });
  
  if (casoExistente) {
    throw new Error(`Ya existe un caso con el nombre "${datos.nombreCaso}" para este cliente y detective.`);
  }

  // Crear el nuevo caso
  const caso = new Caso(datos);
  await caso.save();

  // Actualizar el registro del cliente
  await Cliente.findByIdAndUpdate(datos.idCliente, {
    $push: { casos: { id: caso._id, nombre: caso.nombreCaso } } // Asumiendo que hay un campo 'casos' en el modelo Cliente
  });

  // Actualizar el registro del detective
  await Detective.findByIdAndUpdate(datos.idDetective, {
    $push: { casos: { id: caso._id, nombre: caso.nombreCaso } } // Asumiendo que hay un campo 'casos' en el modelo Detective
  });

  return caso;
}

/**
 * Obtener los casos asociados a un cliente por su ID.
 * @param {string} idCliente - El ID del cliente.
 * @returns {Promise<Array>} - Lista de casos asociados al cliente.
 */
const obtenerCasosPorClienteId = async (idCliente) => {
  try {
    const casos = await Caso.find({ idCliente: idCliente.trim() }).populate('idDetective evidencias');
    return casos;
  } catch (error) {
    throw new Error('Error al obtener casos por ID de cliente');
  }
};

/**
 * Obtener casos asociados a un cliente por correo electrónico.
 * @param {string} emailCliente - Correo electrónico del cliente.
 * @returns {Promise<Array>} Lista de casos asociados al cliente.
 */
const obtenerCasosPorEmailCliente = async (emailCliente) => {
  try {
    // Verificar si el cliente existe
    const cliente = await Cliente.findOne({ correo: emailCliente.trim() });
    if (!cliente) {
      throw new Error(`No se encontró un cliente con el correo: ${emailCliente}`);
    }

    // Buscar casos asociados al cliente
    const casos = await Caso.find({ idCliente: cliente._id }).populate('idDetective evidencias');
    return casos;
  } catch (error) {
    throw new Error(`Error al obtener casos por correo: ${error.message}`);
  }
};

// Listar Casos
async function listarCasos() {
  const casos = await Caso.find().populate('idCliente idDetective evidencias registroCasos');
  if (casos.length === 0) {
    throw new Error('No hay casos registrados actualmente.');
  }
  return casos;
}

// Buscar Caso por ID
async function buscarCasoPorId(id) {
  const caso = await Caso.findById(id).populate('idCliente idDetective evidencias registroCasos');
  if (!caso) {
    throw new Error('Caso no encontrado');
  }
  return caso;
}

// Actualizar Caso
async function actualizarCaso(id, datos) {
  const caso = await Caso.findById(id);

  if (!caso) {
    throw new Error('El caso que intenta actualizar no existe.');
  }

  // Actualizar los datos del caso
  Object.assign(caso, datos);
  return await caso.save();
}

// Desactivar Caso
async function desactivarCaso(id) {
  const casoDesactivado = await Caso.findByIdAndUpdate(id, { activo: false }, { new: true });
  if (!casoDesactivado) {
    throw new Error('Caso no encontrado');
  }
  return casoDesactivado;
}

module.exports = {
  crearCaso,
  listarCasos,
  buscarCasoPorId,
  actualizarCaso,
  desactivarCaso,
  obtenerCasosPorClienteId,
  obtenerCasosPorEmailCliente
};
