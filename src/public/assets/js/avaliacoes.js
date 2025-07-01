var container;
let avaliacao = 0;
const API_URL = '/avaliacoes'

function atualizarEstrelas() {
    const estrelas = container.querySelectorAll("span");
    estrelas.forEach((estrela, index) => {
        estrela.innerHTML = index < avaliacao ? '<i class="bi bi-star-fill"></i>' : estrela.innerHTML;
        estrela.style.color = index < avaliacao ? "gold" : "#ccc";
    });
}

async function enviarAvaliacao() {
    console.log('enviando')
    const comentario = document.getElementById("comentario").value;
    await this.salvarAvaliacao(comentario);
    alert(`Obrigado por nos avaliar! Seu feedback é muito importante para melhorar nossa plataforma.`);

    // Limpar os campos
    document.getElementById("comentario").value = "";
    avaliacao = 0;
    atualizarEstrelas();
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalAvaliacao'));
    modal.hide();
}

async function salvarAvaliacao(comentario) {
    try {
        console.log('salvando')
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comentario,
                avaliacao
            })
        });
        let data = await res.json();
        return data;
    } catch (e) {
        console.error(e);
        throw new Error("Erro ao enviar comentário");
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    container = document.getElementById("star-rating");
    for (let i = 1; i <= 5; i++) {
        const estrela = document.createElement("span");
        estrela.innerHTML = "<i class='bi bi-star-fill'></i>";
        estrela.classList.add("fs-1", "mx-1");
        estrela.style.cursor = "pointer";
        estrela.dataset.valor = i;
        estrela.style.color = "#ccc";

        estrela.addEventListener("click", () => {
            avaliacao = i;
            atualizarEstrelas();
        });

        container.appendChild(estrela);
    }

})

