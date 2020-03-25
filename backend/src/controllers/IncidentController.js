const connection = require('../database/connection');

module.exports = {

    //listar
    async index(request, response){
        const { page = 1 } = request.query;

        //numero de registro, total
        const [ count ]  = await connection('incidents').count();

        //limitar 5 registro por paginas
        const incidents = await connection('incidents')
            //relacionamento de tabelas
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        //mostrar total de registro no cabeçalho
        response.header('X-Total-Count', count['count(*)']);    

        return response.json(incidents);
    },


    //Cadastrar um incidente
    async create(request, response){

        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });

    },

    //Deletar 
    async delete(request, response){
        //pegar o id
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operação não permitida' });
        }

        //se passou, deleta
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }


};