import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import Usuario from "../models/usuario.model.js"

// normalmente isso estaria no .env, mas por ser atividade didatica
// vou evitar o uso do .env
const secret = "asjidmxokczlhfacsmndalxla" 

async function merigoldConta(){
    const salt = bcrypt.genSaltSync()
    // a senha do admin sera 123456789 
    const hashedPassword = bcrypt.hashSync("123456789", salt)
    try{
        await Usuario.create({
            username: "merigold",
            senha_hash: hashedPassword,
            admin: true
        })
    }
    catch (e){
        console.log("nn foi possivel criar conta da merigold")
        console.log(e)
    }
}

async function register(request, response){
    if (!request.body.username || !request.body.password){
        response.status(400).send("Informe usuário e senha!")
    }
    let usuario = await Usuario.findOne({where: {username: request.body.username}}) 
    if (usuario){
        response.status(400).send("Usuário já cadastrado")
    }
    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(request.body.password, salt)

    Usuario.create({
        username: request.body.username,
        senha_hash: hashedPassword,
        admin: false
    })
    .then((res)=>{
        const meuToken = getToken(res.dataValues.id, res.dataValues.admin)
        response.status(201).send({token: meuToken})
    })
    .catch((erro)=>{
        console.log(erro)
        response.status(500).send(erro)
    })
}

async function login(request, response){
    if (!request.body.username || !request.body.password){
        return response.status(400).send("Informe usuário e senha!")
    }

    const user = await Usuario.findOne({ where: { username: request.body.username }})
    if (!user){
        return response.status(400).send("Usuário não cadastrado!")
    }

    if (!bcrypt.compareSync(request.body.password, user.senha_hash)){
        return response.status(401).send("Usuário ou senha inválidos!")
    }
    const meuToken = getToken(user.id, user.admin)
    return response.status(200).json({
        id: user.id,
        token: meuToken
    })
}

function getToken(id, admin){
    return jwt.sign({
        sub: id,
        admin: admin},
        secret, {expiresIn: '7d'})
}

async function validateToken(request, response, next) {
    let token = request.headers.authorization
    try {
        if (token && token.startsWith("Bearer")) {
            token = token.substring(7, token.length)
            const decodedToken = jwt.verify(token, secret)
            next()
        } else {
            return response.status(401).send({ message: "Unauthorized" })
        }
    } catch (e) {
        return response.status(401).send({ message: "Unauthorized" })
    }
}

async function validadeAdmin(request, response, next){
    let token = request.headers.authorization
    try {
        if (token && token.startsWith("Bearer")) {
            token = token.substring(7, token.length)
            const decodedToken = jwt.verify(token, secret)
            if (decodedToken.admin === true){
                return next()
            }
            else{
                console.log(decodedToken)
                return response.status(403).json({ message: "Forbidden" })
            }
        } else {
            return response.status(401).send({ message: "Unauthorized" })
        }
    } catch (e) {
        return response.status(401).send({ message: "Unauthorized" })
    }
}

export default {login, register, validateToken, validadeAdmin, merigoldConta}