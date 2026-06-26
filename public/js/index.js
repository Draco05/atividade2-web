let slideIndex = 0;

function mostrarFoto(index) {
  const slides = document.querySelectorAll('.slide');
  
  if (index >= slides.length) {
    slideIndex = 0;
  }
  else if (index < 0) {
    slideIndex = slides.length - 1;
  } else {
    slideIndex = index;
  }

  slides.forEach(slide => {
    slide.style.display = "none";
  });

  slides[slideIndex].style.display = "block";
}

function mudarFoto(direcao) {
  mostrarFoto(slideIndex + direcao);
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarFoto(slideIndex);
});


async function getPocoes() {
    const itens = document.getElementById("itens")
    try {
        const res = await fetch("http://localhost:3000/pocoes")
        let pocoes
        if (res.ok) {
            pocoes = await res.json()

        }
        else throw new Error('erro na requisição das poções')

        for (let pocao of pocoes){
            const card = document.createElement('div')
            card.className = 'card-pocao'
            const nome = document.createElement('h2')
            nome.innerText = pocao.nome
            const preco = document.createElement('h2')
            preco.innerText = pocao.preco
            const descricao = document.createElement('p')
            descricao.innerText = pocao.descricao
            const imagem = document.createElement('img')
            imagem.src = pocao.foto
            const btn_comprar = document.createElement('button')
            btn_comprar.innerText = "Comprar"
            btn_comprar.classList.add("btn")

            card.appendChild(nome)
            card.appendChild(preco)
            card.appendChild(descricao)
            card.appendChild(imagem)
            card.appendChild(btn_comprar)

            itens.appendChild(card)
        }

    }
    catch (e) {
        console.log(e)
    }
    
}

document.addEventListener('DOMContentLoaded', getPocoes);