const container = document.getElementById("star-rating");
let avaliacao = 0;

for (let i = 1; i <= 5; i++) {
    const estrela = document.createElement("span");
    estrela.textContent = "★";
    estrela.classList.add("fs-1", "mx-1");
    estrela.style.cursor = "pointer";
    estrela.dataset.valor = i;

    estrela.addEventListener("click", () => {
        avaliacao = i;
        atualizarEstrelas();
    });

    container.appendChild(estrela);
}

function atualizarEstrelas() {
    const estrelas = container.querySelectorAll("span");
    estrelas.forEach((estrela, index) => {
        estrela.style.color = index < avaliacao ? "gold" : "#ccc";
    });
}

function enviarAvaliacao() {
    const comentario = document.getElementById("comentario").value;
    alert(`Avaliação enviada!\nNota: ${avaliacao} estrela(s)\nComentário: ${comentario}`);
}

function enviarAvaliacao() {
    const comentario = document.getElementById("comentario").value;

    // Exibir alerta (opcional)
    alert(`Avaliação enviada!\nNota: ${avaliacao} estrela(s)\nComentário: ${comentario}`);

    // Criar elemento da nova avaliação
    const novaAvaliacao = document.createElement("li");
    novaAvaliacao.classList.add("list-group-item");

    novaAvaliacao.innerHTML = `
        <strong>Nota:</strong> ${avaliacao} estrela(s)<br>
        <strong>Comentário:</strong> ${comentario}
    `;

    // Adiciona na lista de avaliações
    const lista = document.getElementById("lista-avaliacoes");
    lista.appendChild(novaAvaliacao);

    // Limpar os campos
    document.getElementById("comentario").value = "";
    avaliacao = 0;
    atualizarEstrelas();
}

// Salvar no localStorage
const novaEntrada = {
    nota: avaliacao,
    comentario: comentario
};

let avaliacoesSalvas = JSON.parse(localStorage.getItem("avaliacoes")) || [];
avaliacoesSalvas.push(novaEntrada);
localStorage.setItem("avaliacoes", JSON.stringify(avaliacoesSalvas));



function carregarAvaliacoes() {
    const avaliacoesSalvas = JSON.parse(localStorage.getItem("avaliacoes")) || [];
    const lista = document.getElementById("lista-avaliacoes");

    avaliacoesSalvas.forEach(avaliacaoObj => {
        const item = document.createElement("li");
        item.classList.add("list-group-item");
        item.innerHTML = `
            <strong>Nota:</strong> ${avaliacaoObj.nota} estrela(s)<br>
            <strong>Comentário:</strong> ${avaliacaoObj.comentario}
        `;
        lista.appendChild(item);
    });
}

// Chamar a função quando a página carregar
window.addEventListener("DOMContentLoaded", carregarAvaliacoes);