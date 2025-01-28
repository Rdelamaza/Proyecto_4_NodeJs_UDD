require ('dotenv').config();
const express = require('express');
const app = express();
const reservasRoutes = require('./routes/reservas.routes.js');

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", reservasRoutes);
app.listen(port, () => {
    console.log('Servidor iniciado en puerto', port);
});
