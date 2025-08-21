const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

let alunos = [
    {"id":1, "ra":123, "nome":"Fulano"}
]

app.get("/aluno",(req,res) => {
    res.json({alunos})
})

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

app.listen(port, () => {
    console.log("Servidor de API rodando")
})