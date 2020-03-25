const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); //conexao development do arquivo knexfile

module.exports = connection;