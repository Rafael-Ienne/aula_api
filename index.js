const express = require('express')

const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerOptions = require('./extend.js')
const specs = swaggerJsdoc(swaggerOptions)

const app = express()
const port = 3000

app.use(express.json())

/**
 * @swagger
 * components:
 *  schemas:
 *      Aluno:
 *          type: object
 *          required:
 *              - id
 *              - ra
 *              - nome
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Identificado único do aluno
 *              nome:
 *                  type: string
 *                  description: Nome do aluno
 *              ra:
 *                  type: integer
 *                  description: Numero de matricula do aluno
 *          example:
 *              id: 1
 *              nome: Rafael
 *              ra: 2304025
 */
let alunos = [
    {"id":1, "ra":123, "nome":"Fulano"}
]

/**
 * @swagger
 * /aluno:
 *  get:
 *      summary: Retorna todos os alunos
 *      tags: [Alunos]
 *      responses:
 *          200:
 *              description: Lista de alunos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Aluno'
 */
app.get("/aluno",(req,res) => {
    res.json({alunos})
})

/**
 * @swagger
 * /aluno:
 *  post:
 *      summary: Salva um aluno
 *      tags: [Alunos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nome:
 *                              type: string
 *                          ra:
 *                              type: integer
 *      responses:
 *          201:
 *              description: Cadastro de aluno
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Aluno'
 */
app.post("/aluno",(req, resp) => {
    const novoAluno = {id: alunos.length + 1, ... req.body}
    alunos.push(novoAluno)
    resp.status(201).json(novoAluno)
})

app.delete("/aluno/:id", (req, res) => {
    const {id} = req.params
    const alunoIndex = alunos.findIndex(a => a.id == id)

        if (alunoIndex > -1){
            alunos[alunoIndex] = {}
            res.json({"message":"aluno deletado com sucesso"})
        } else {
            res.status(404).json({"message":"Cara, tem certeza que é esse id?"})
        }
    
})

/**
 * @swagger
 * /aluno:
 *  put:
 *      summary: Atualiza um aluno
 *      tags: [Alunos]
 *      parameters:
 *        - in: path
*          name: id
*          required: true
*          schema:
*              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nome:
 *                              type: string
 *                          ra:
 *                              type: integer
 *      responses:
 *          200:
 *              description: Atualização de aluno feita com sucesso
 *          404:
 *              description: Atualização de aluno com erro
 */
app.put("/aluno/:id", (req, res) => {
    const {id} = req.params
    const alunoIndex = alunos.findIndex(a => a.id == id)

        if (alunoIndex > -1){
            alunos[alunoIndex] = {id: Number(id), ...req.body}
            res.json(alunos[alunoIndex])
        } else {
            res.status(404).json({"message":"Cara, tem certeza que é esse id?"})
        }
    
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.listen(port, () => {
    console.log("Servidor de API rodando")
})