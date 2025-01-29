require ('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const reservasRoutes = require('./routes/reservas.routes.js');
const reservasFilePath = path.join(__dirname,'data', 'reservas.json');
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", reservasRoutes);
app.listen(port, () => {
    console.log('Servidor iniciado en puerto', port);
});
