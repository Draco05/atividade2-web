import model from "../models/pocao.model.js"

function findAll(request, response){
    model.findAll().then((res) =>{
        response.json(res).status(200)
    }).catch((err) =>{
        response.json(err).status(500)
    })
}

function create(request, response){
    model.create({
        nome: request.body.nome,
        descricao: request.body.descricao,
        preco: request.body.preco,
        foto: request.body.foto
    }).then((res)=>{
        response.json(res).status(201)
    }).catch((err)=>{
        response.json(err).status(500)
    })
}

function deleteByPk(request, response){ 
    model.destroy({where: {id: request.params.id}})
    .then((res)=>{
        response.json(res).status(200)
    })
    .catch((err)=>{
        response.json(err).status(500)
    })
}

export default {findAll, create, deleteByPk}