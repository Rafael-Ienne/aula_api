const swaggerOptions = {
    definition:{
        openapi:'3.0.0',
        info:{
            title:'API de alunos',
            version:'1.0.0',
            description:'API de gerenciamento de alunos'
        },
        servers:[
            {
            url:'http://localhost:3000',
            description:'Servidor para API de alunos'
            }
        ]
    },
    apis:['index.js']
}

module.exports = swaggerOptions