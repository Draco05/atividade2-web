const itens = document.getElementById("itens")
document.getElementById('formCadastroPocao').addEventListener('submit', async function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;
  const preco = document.getElementById('preco').value;
  const imagem = document.getElementById('imagemUrl').value;

  await novaPocao(nome, descricao, imagem, preco)
});


async function novaPocao(nome, descricao, foto, preco) {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }
    const payload = {
        nome: nome,
        descricao: descricao,
        foto: foto,
        preco: preco
    }

    try {
        const response = await fetch(`/pocoes`, {
        method: 'POST', 
        headers: { 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
                });
        
        if (!response.ok){
            window.location.href = 'login.html';
        }
        criaCard(nome, preco, descricao, foto)
    }
    catch(e){
        console.log(e)
    }

}

async function deletePocao(id, elemento) {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }
    try {
        const response = await fetch(`/pocoes/${id}`, {
        method: 'DELETE', 
        headers: { 'Authorization': `Bearer ${token}`}});
        
        if (!response.ok){
            window.location.href = 'login.html';
        }
        itens.removeChild(elemento)
    }
    catch(e){
        console.log(e)
    }
}

function criaCard(pNome, pPreco, pDescricao, pFoto){
    const card = document.createElement('div')
    card.className = 'card-pocao'
    const nome = document.createElement('h2')
    nome.innerText = pNome
    const preco = document.createElement('h2')
    preco.innerText = pPreco
    const descricao = document.createElement('p')
    descricao.innerText = pDescricao
    const imagem = document.createElement('img')
    imagem.src = pFoto
    const btn_rm = document.createElement('button')
    btn_rm.innerText = "Remover item"
    btn_rm.classList.add("btn-rm")
    btn_rm.addEventListener('click', ()=>deletePocao(pocao.id, card))
    card.appendChild(nome)
    card.appendChild(preco)
    card.appendChild(descricao)
    card.appendChild(imagem)
    card.appendChild(btn_rm)
    itens.appendChild(card)
}


async function getPocoes() {
    try {
        const res = await fetch("http://localhost:3000/pocoes")
        let pocoes
        if (res.ok) {
            pocoes = await res.json()

        }
        else throw new Error('erro na requisição das poções')

        for (let pocao of pocoes){
            criaCard(pocao.nome, pocao.preco, pocao.descricao, pocao.foto)
        }

    }
    catch (e) {
        console.log(e)
    }
    
}

document.addEventListener('DOMContentLoaded', getPocoes);

