const erroMsg = document.getElementById('erro-msg')
erroMsg.style.display = 'none';

document.getElementById('formLogin').addEventListener('submit', async function (event) {
    event.preventDefault();

    const usuario = document.getElementById('username').value;
    const senha = document.getElementById('senha').value;
    const payload = {
        username: usuario,
        password: senha
    }
    try{
        const res = await fetch("http://localhost:3000/signin", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        if (res.ok){
            let token = await res.json()
            token = token.token
            localStorage.setItem('token', token);
            window.location.href = 'admin.html'
        }
        else{
            erroMsg.style.display = 'block';
        }
    }
    catch (e){
        console.log(e)
    }

});