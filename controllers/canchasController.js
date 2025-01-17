// controllers/canchasController.js - Controlador de Cancha
const Cancha = require('../models/Cancha')

exports.obtenerCanchas = async (req, res) => {
  try {
    console.log('Intentando obtener canchas...');
    const canchas = await Cancha.obtenerTodas()
    console.log('Canchas obtenidas:', canchas);
    res.json(canchas)
  } catch (error) {
    console.error('Error detallado:', {
      message: error.message,
      stack: error.stack,
      details: error.details // Para errores de Supabase
    });
    res.status(500).json({ 
      error: 'Error al obtener canchas',
      message: error.message,
      details: error.details
    })
  }
}

exports.obtenerCanchaPorId = async (req, res) => {
  try {
    const cancha = await Cancha.obtenerPorId(req.params.id)
    if (!cancha) {
      return res.status(404).json({ error: 'Cancha no encontrada' })
    }
    res.json(cancha)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cancha' })
  }
}

exports.crearCancha = async (req, res) => {
  try {
    const nuevaCancha = await Cancha.crearCancha(req.body)
    res.status(201).json(nuevaCancha)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cancha' })
  }
}

exports.actualizarCancha = async (req, res) => {
  try {
    const canchaActualizada = await Cancha.actualizarCancha(req.params.id, req.body)
    if (!canchaActualizada) {
      return res.status(404).json({ error: 'Cancha no encontrada' })
    }
    res.json(canchaActualizada)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cancha' })
  }
}

exports.eliminarCancha = async (req, res) => {
  try {
    const canchaEliminada = await Cancha.eliminarCancha(req.params.id)
    if (!canchaEliminada) {
      return res.status(404).json({ error: 'Cancha no encontrada' })
    }
    res.json({ message: 'Cancha eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cancha' })
  }
}
