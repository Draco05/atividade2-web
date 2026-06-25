import Usuario from "./models/usuario.model.js"
import Pocao from "./models/pocao.model.js"

await Usuario.sync()
await Pocao.sync()

await Pocao.create({
    nome: "Poção Blue Sky", 
    descricao: "Essa poção provê um surto de inspiração por 24 horas. Foi utilizada por John Lennon quando escreveu Lucy in the Sky with Diamonds.", 
    preco: 300, 
    foto: "https://i.ibb.co/ZzS7xb2/rsz-sky.png"})

await Pocao.create({
    nome: "Poção do Perfume Misterioso",
    descricao: "Essa poção faz com que você fique cheirando lilás e groselha por 24 dias. Essência muito admirada pelos bruxos.",
    preco: 200,
    foto: "https://i.ibb.co/pyhZJXf/rsz-lilas.png"})

await Pocao.create({
    nome: "Poção de Pinus", 
    descricao: " Essa poção faz com que você fique 10 cm mais alto! Observação: efeitos colaterais desconhecidos." , 
    preco: 3000, 
    foto: "https://i.ibb.co/DkzdL1q/rsz-pinus.png"})

await Pocao.create({
    nome: "Poção da Beleza Eterna", 
    descricao: "Veneno que mata rápido." , 
    preco: 100, 
    foto: "https://i.ibb.co/9p872NK/rsz-1beleza.png"})

await Pocao.create({
    nome: "Poção do Arco Íro", 
    descricao: "Traz felicidade momentânea. Pode durar de 10 minutos a 2 dias.",
    preco: 120 ,
    foto: "https://i.ibb.co/PrC09MP/rsz-2unicornio.png"})

await Pocao.create({
    nome: "Caldeirão das Verdades Secretas", 
    descricao: "As pessoas lhe dirão apenas verdades por 1 hora. É necessário beber os 5L.",
    preco: 150, 
    foto: "https://i.ibb.co/s9Lyvj8/rsz-verdades.png" })

export default {}