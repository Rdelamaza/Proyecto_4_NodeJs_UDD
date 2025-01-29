const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const reservasFilePath = path.join(__dirname, '..', 'data', 'reservas.json');


const leerReservas = () => {
    if (!fs.existsSync(reservasFilePath)) {
        
        return [];
    }

    const data = fs.readFileSync(reservasFilePath, 'utf-8');
    
    return JSON.parse(data);
};


const guardarReservas = (reservas) => {
    fs.writeFileSync(reservasFilePath, JSON.stringify(reservas, null, 2), 'utf-8');
};

///CREAR UNA RESERVA POST
const crearReserva = async (req, res) => {
    const {cliente, fecha_entrada, fecha_salida, tipo_habitacion, num_huespedes, hotel, estado} = req.body;
    const reservas = leerReservas();
    const nuevaReserva = {
        id: uuidv4(),
        cliente,
        fecha_entrada,
        fecha_salida,
        tipo_habitacion,
        num_huespedes,
        hotel,
        estado 
    };
    if (!nuevaReserva.cliente || !nuevaReserva.fecha_entrada || !nuevaReserva.fecha_salida || !nuevaReserva.tipo_habitacion || !nuevaReserva.num_huespedes || !nuevaReserva.hotel || !nuevaReserva.estado) {
        return res.status(400).send({mensaje: 'Faltan datos'});  
        
    }

    reservas.push(nuevaReserva);

    try {
        fs.writeFileSync(reservasFilePath, JSON.stringify(reservas, null, 2), 'utf-8');
        res.send({mensaje: 'Reserva creada', nuevaReserva});
    } catch (error) {
        res.status(500).send({mensaje: 'Error al guardar la reserva'});
    }
};


/// OBTENER TODAS LAS RESERVAS GET
const obtenerTodasLasReservas = async (req, res) => {
    const reservas = leerReservas();
    res.send({mensaje: 'Reservas encontradas', data: reservas});
};

/// OBTENER RESERVA POR ID GET
const obtenerReservaId = async (req, res) => {
    const reservas = leerReservas();
    const reserva = reservas.find(reserva => reserva.id == req.params.id);
    if (!reserva) {
        return res.status(404).send({mensaje: 'Reserva no encontrada'});
    }
    res.send({mensaje: 'Reserva encontrada', data: reserva});
    
};


/// ACTUALIZAR RESERVA POR ID PUT
const modificarReservaId = async (req, res) => {
    const reservas = leerReservas();
    const index = reservas.findIndex(reserva => reserva.id == req.params.id);

    if (index === -1) {
        return res.status(404).send({mensaje: 'Reserva no encontrada'});
    }

    reservas[index] = {
        ...reservas[index],
        cliente: cliente || reservas[index].cliente,
        fecha_entrada: fecha_entrada || reservas[index].fecha_entrada,
        fecha_salida: fecha_salida || reservas[index].fecha_salida,
        tipo_habitacion: tipo_habitacion || reservas[index].tipo_habitacion,
        num_huespedes: num_huespedes || reservas[index].num_huespedes,
        hotel:  hotel || reservas[index].hotel,
        estado: estado || reservas[index].estado
    };
    guardarReservas(reservas);
    res.send({mensaje: 'Reserva modificada', data: reservas[index]});
};



/// ELIMINAR RESERVA POR ID DELETE
const eliminarReservaId = async (req, res) => {
    const reservas = leerReservas();
    const index = reservas.findIndex(reserva => reserva.id == id);
    if (index === -1) {
        return res.status(404).send({mensaje: 'Reserva no encontrada'});
    }

    reservas.splice(index, 1);
    guardarReservas(reservas);
    res.send({mensaje: 'Reserva eliminada'});
}



/// OBTENER RESERVA POR HOTEL GET
const obtenerReservaPorHotel = async (req, res) => {
    const reservas = leerReservas();
    const reservaFiltrada = reservas.filter(reserva => reserva.hotel.toLowerCase() == hotel.toLowerCase());

    if (reservaFiltrada.length === 0) {
        return res.status(404).send({mensaje: 'Reserva no encontrada'});
    }
    res.send({mensaje: 'Reserva encontrada', data: reservaFiltrada});
}



/// OBTENER RESERVAS POR FECHA DE ENTRADA Y SALIDA GET
const obtenerReservaPorFechas = async (req, res) => {  
    const reservas = leerReservas();

    const reservaFiltradaPorFecha = reservas.filter(reserva => reserva.fecha_entrada == fecha_entrada && reserva.fecha_salida == fecha_salida);
    if (reservaFiltrada.length === 0) {
        return res.status(404).send({mensaje: 'Reserva no encontrada'});
    }
    res.send({mensaje: 'Reserva encontrada', data: reservaFiltradaPorFecha});
};



///OBTENER RESERVAS POR TIPO DE HABITACION GET
const obtenerReservaPorTipoHabitacion = async (req, res) => {
    const reservas = leerReservas();
    const reservaFiltradaPorTipoHabitacion = reservas.filter(reserva => reserva.tipo_habitacion.toLowerCase() == tipo_habitacion.toLowerCase());

    if (reservaFiltrada.length === 0) {
        return res.status(404).send({mensaje: 'Reserva no encontrada'});
    }
    res.send({mensaje: 'Reserva encontrada', data: reservaFiltradaPorTipoHabitacion});
};



///OBTENER RESERVAS POR ESTADO GET
const obtenerReservaPorEstado = async (req, res) => {
    const reservas = leerReservas();
    const reservaFiltradaPorEstado = reservas.filter(reserva => reserva.estado.toLowerCase() == estado.toLowerCase());

    if (reservaFiltrada.length === 0) {
        return res.status(404).send({mensaje: 'Reserva no encontrada'});
    }
    res.send({mensaje: 'Reserva encontrada', data: reservaFiltradaPorEstado});
};



///OBTENER RESERVAS POR NUMERO DE HUESPEDES GET
const obtenerReservaPorNumeroHuespedes = async (req, res) => {
    const reservas = leerReservas();
    const reservaFiltradaPorNumeroHuespedes = reservas.filter(reserva => reserva.num_huespedes == num_huespedes);

    if (reservaFiltrada.length === 0) {
        return res.status(404).send({mensaje: 'Reserva no encontrada'});
    }
    res.send({mensaje: 'Reserva encontrada', data: reservaFiltradaPorNumeroHuespedes});
};



module.exports = {crearReserva, obtenerTodasLasReservas, modificarReservaId, eliminarReservaId, obtenerReservaId, obtenerReservaPorHotel,obtenerReservaPorFechas,obtenerReservaPorTipoHabitacion,obtenerReservaPorEstado,obtenerReservaPorNumeroHuespedes};