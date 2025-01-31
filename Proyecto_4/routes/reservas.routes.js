const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservas.controllers.js');


router.post('/reservas', reservasController.crearReserva);
router.get('/reservas', reservasController.obtenerTodasLasReservas);
router.get('/reservas/:id', reservasController.obtenerReservaId);
router.put('/reservas/:id', reservasController.modificarReservaId);
router.delete('/reservas/:id', reservasController.eliminarReservaId);
router.get('/reservas/hotel/:hotel', reservasController.obtenerReservaPorHotel);
router.get('/reservas/fecha_entrada/:fecha_entrada', reservasController.obtenerReservaPorFechaEntrada);
router.get('/reservas/fecha_salida/:fecha_salida', reservasController.obtenerReservaPorFechaSalida);
router.get('/reservas/tipo_habitacion/:tipo_habitacion', reservasController.obtenerReservaPorTipoHabitacion);
router.get('/reservas/estado/:estado', reservasController.obtenerReservaPorEstado);
router.get('/reservas/num_huespedes/:num_huespedes', reservasController.obtenerReservaPorNumeroHuespedes);


module.exports = router;