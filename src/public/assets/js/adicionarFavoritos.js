// === adicionarFavoritos.js ===
const API_USUARIOS_URL = '/usuarios';
var usuarioLogado;
const usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));

async function obterUsuarioDb(id) {
    const response = await fetch(`${API_USUARIOS_URL}/${id}`);
    usuarioLogado = await response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
    await obterUsuarioDb();

    document.addEventListener("click", async function (e) {
        await obterUsuarioDb(usuarioCorrente.id);

        if (e.target.closest(".save-btn")) {
            const button = e.target.closest(".save-btn");
            const card = button.closest(".card");
            const nomeCurso = card.querySelector(".card-title").textContent;

            // Pega as informações do curso do card
            const curso = {
                nome: nomeCurso,
                instituicao: card.querySelector(".card-text").textContent,
                imagem: card.querySelector("img").src,
                link: card.querySelector(".card-link, a").href, // Pegue o link do curso
                area: obterCategoriaAtual(),
                id: gerarIdDoCurso(card) // Gera um ID único para o curso favoritado
            };
            
            //Se não achar usuario logado mostra a mensagem 
            if (!usuarioLogado) {
                alert("Você precisa estar logado para adicionar cursos aos favoritos.");
                return;
            }

            try {
                // Busca os dados do usuário
                const response = await fetch(`${API_USUARIOS_URL}/${usuarioLogado.id}`);
                if (!response.ok) {
                    throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
                }
                const usuario = await response.json();

                usuario.favoritos = usuario.favoritos || []; // Garante que a lista de favoritos exista

                const favoritoIndex = usuario.favoritos.findIndex(f => f.nome === curso.nome); // Verifica se o curso já é um favorito pelo nome
                const icone = button.querySelector("i");

                if (favoritoIndex !== -1) {
                    // Curso já está nos favoritos, então remove
                    usuario.favoritos.splice(favoritoIndex, 1);
                    if (icone) {
                        icone.classList.remove("text-warning", "bi-bookmark-fill"); 
                        icone.classList.add("text-secondary", "bi-bookmark");    // Volta para cor/ícone neutro
                    }
                    alert("Curso removido dos favoritos.");
                } else {
                    // Curso não está nos favoritos, então adiciona
                    usuario.favoritos.push(curso);
                    if (icone) {
                        icone.classList.remove("text-secondary", "bi-bookmark");
                        icone.classList.add("text-warning", "bi-bookmark-fill"); // Muda para cor/ícone de favorito
                    }
                    alert("Curso adicionado aos favoritos com sucesso!");
                }

                // Atualiza os dados do usuário no json server com a nova lista de favoritos
                const updateResponse = await fetch(`${API_USUARIOS_URL}/${usuario.id}`, {
                    method: "PATCH", // PATCH atualiza apenas os campos enviados
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ favoritos: usuario.favoritos }) // Envia apenas o array de favoritos atualizado
                });

                if (!updateResponse.ok) {
                    throw new Error(`Erro ao atualizar favoritos: ${updateResponse.statusText}`);
                }

                // Atualiza o localStorage com os novos dados do usuário
                const usuarioAtualizado = await updateResponse.json(); // json-server retorna o objeto atualizado no PATCH
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));

            } catch (error) {
                console.error("Falha ao processar favorito:", error);
                alert("Ocorreu um erro ao gerenciar seus favoritos. Tente novamente.");
            }
        }
    });
});

// Chama essa função depois os cursos serem carregados na tela
function marcarFavoritos() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado || !usuarioLogado.favoritos) return; // Verifica se há usuário e favoritos

    const favoritos = usuarioLogado.favoritos || [];
    document.querySelectorAll(".card").forEach(card => {
        const nomeCursoCard = card.querySelector(".card-title").textContent;
        const icone = card.querySelector(".save-btn i");

        if (icone) {
            const isFavorito = favoritos.some(f => f.nome === nomeCursoCard);
            if (isFavorito) {
                icone.classList.remove("text-secondary", "bi-bookmark");
                icone.classList.add("text-warning", "bi-bookmark-fill");
            } else {
                icone.classList.remove("text-warning", "bi-bookmark-fill");
                icone.classList.add("text-secondary", "bi-bookmark");
            }
        }
    });
}


//auxiliares
function obterCategoriaAtual() {
    // Busca o botão de categoria que está ativo na página de cursos
    const ativo = document.querySelector(".category-btn.active");
    // Senão um valor padrão.
    return ativo ? ativo.getAttribute("data-category") : "geral"; 
}

function gerarIdDoCurso(card) {
    // Gera um ID para o curso baseado no título, deixa tudo em letra minuscula e tira caracteres especiais.
    const titulo = card.querySelector(".card-title").textContent;
    return titulo.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, '');
}
