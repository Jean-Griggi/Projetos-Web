const formulario = document.querySelector('form');
const botao = document.getElementById('button');
const divSenha = document.getElementById('senha'); 
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha_login'); 
const verificar = /\S+@\S+\.\S+/;

botao.addEventListener('click', function(evento) {
    evento.preventDefault();

    if (!divSenha.classList.contains('visivel')) {
        
        if (verificar.test(emailInput.value)) {
            divSenha.classList.add('visivel');
            botao.textContent = 'login';
        }
         else {
            alert("Por favor insira um email válido!");
        }

    } else {

        if (senhaInput.value.length < 4) {
            alert("Coloque uma senha de no minimo 4 caracteres!");
        } 
        
        else {
            alert("Te encaminhando para o site!");
            window.location.href = "/html/index.html"
        }
    }
});