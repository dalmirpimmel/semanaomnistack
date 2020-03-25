const express = require('express');

//importar
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//rota login
routes.post('/sessions', SessionController.create);


//chama a listagem das ongs
routes.get('/ongs', OngController.index);
//chama cadastro das ongs
routes.post('/ongs', OngController.create);

//listar todos os casos de uma ong
routes.get('/profile', ProfileController.index);


//chama a listagem das ongs
routes.get('/incidents', IncidentsController.index);
//cadastrar incidentes
routes.post('/incidents', IncidentsController.create);
//Deletar incidentes
routes.delete('/incidents/:id', IncidentsController.delete);

module.exports = routes;