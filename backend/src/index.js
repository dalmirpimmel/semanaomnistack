
const express = require('express');
const cors = require('cors');   
const routes = require('./routes'); //importar as rotas

const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(3333); // listar na porta 3333 do local host


/**
 * Rota / Recurso
 */

 /**
  * Métotos HTTP:
  * 
  * GET: Buscar/listar uma informaçõa do Back-end
  * POST: Criar uma informação no Back-end
  * PUT: Alteral uma informação no Back-end
  * DELETE: Deletar uma informação no Back-end
  */

  /**
   * Tipos de parâmetros
   * 
   * Query Params: parâmetros nomeados enviados apos "?" (filtros, paginação)
   * Route Params: parâmetros utilizados para identificar recursos (/users/:id)
   * Request Body: corpo da requisição, utilizado para criar ou alterar recursos
   */

   /**
    * Vamos utilizar o Banco de Dados SQLite
    * 
    * Driver: SELECT * FROM users 
    * Query Builder: table('users').select('*').where() -> vamos utilizar essa lógica
    * 
    */





