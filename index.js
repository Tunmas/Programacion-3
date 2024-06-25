require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

// Routers
const taskRouter = require("./src/controllers/models/task.routes.js");
const usuarioRouter = require("./src/controllers/models/user.routes.js");

// Secure setup
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; // Definir un puerto por defecto si no está configurado en .env

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Conexión a MongoDB
mongoose.connect(
  process.env.URI, 
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Salir de la aplicación en caso de error de conexión
});

// Ruta de inicio
app.get("/", async (request, response) => {
  return response.send("Backend Prog3 node js express");
});

// Rutas de la API
app.use(taskRouter);
app.use(usuarioRouter);

// Middleware para CORS (podrías elegir solo una forma de configurar CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X-UserId, X-Nonce' +
    ', X-Secret, X-Ts, X-Sig, X-Vendor-Sig, X-Vendor-Apikey, X-Vendor-Nonce, X-Vendor-Ts, X-ProfileId' +
    ', X-Authorization, Authorization, Token, Pragma, Cache-Control, Expires');
  res.header('Access-Control-Allow-Methods', 'HEAD,OPTIONS,GET,PUT,POST,DELETE');
  next();
});

// Configuración de Swagger
const options = {
  explorer: true
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
