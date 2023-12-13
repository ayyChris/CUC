const express = require("express");
const route = express.Router();

const services= require('../services/render');
//donde inicia el servidor

const controller = require('../controller/controller');

//obtener routes desde el render
route.get('/', services.homeRoutes);

route.get('/registrar-maestro', services.registar_maestro);

route.get('/modificar-maestro', services.modificar_maestro);

//CREAR API
route.post('/API/Users', controller.create);
route.get('/API/Users', controller.findAll);
route.get('/API/Users/:id', controller.findOne);
route.put('/API/Users/:id', controller.update);
route.delete('/API/Users/:id', controller.delete);


module.exports = route //readable in server.js