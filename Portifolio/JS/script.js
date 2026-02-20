const botao = document.getElementById("temaBtn")
const foto = document.getElementById("perfil")

function atualizarTema() {
    if(document.body.classList.contains("claro")){
        botao.textContent = "Tema Escuro"
        foto.src = "../fotos/perfiljean-claro.jpeg"
    } else {
        botao.textContent = "Tema Claro"
        foto.src = "../fotos/perfiljean-escuro.jpeg"
    }
}

if(localStorage.getItem("tema") === "claro"){
    document.body.classList.add("claro")
}

atualizarTema()

botao.addEventListener("click", () => {
    document.body.classList.toggle("claro")

    if(document.body.classList.contains("claro")){
        localStorage.setItem("tema", "claro")
    } else {
        localStorage.setItem("tema", "escuro")
    }

    atualizarTema()
})