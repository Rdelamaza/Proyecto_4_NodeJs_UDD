const express = require('express');
const app = express();
require ('dotenv').config();

const clave = process.env.CLAVE;
const port = process.env.PORT;
console.log({clave});



app.use(express.json());
app.listen(port, () => {
    console.log('Servidor iniciado en puerto', port);
});
