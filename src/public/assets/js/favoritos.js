const API_USUARIOS_URL = '/usuarios';
var usuarioLogado;
const usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));

async function obterUsuarioDb(id) {
    const response = await fetch(`${API_USUARIOS_URL}/${id}`);
    usuarioLogado = await response.json();
}

// Espera o site carregar pra começar a rodar o código
document.addEventListener("DOMContentLoaded", async () => {
    await obterUsuarioDb(usuarioCorrente.id);
    const cursosContainer = document.getElementById("cursos-container"); // Onde os cards dos cursos vão aparecer

    // Se não tiver ninguém logado, mostra um aviso e um botão pra fazer login
    if (!usuarioLogado) {
        cursosContainer.innerHTML = `
            <div class="text-center mt-5">
                <p class="fs-4">Você precisa estar logado para ver seus favoritos.</p>
                <a href="../login/login.html" class="btn btn-primary">Fazer Login</a>
            </div>`;
        return; // Para tudo aqui
    }

    // Se estiver logado, carrega os favoritos desse usuário
    carregarFavoritos(usuarioLogado.id, cursosContainer);
});

// Função que busca os favoritos do usuário e mostra na tela
async function carregarFavoritos(usuarioId, container) {
    try {
        // Pega os dados do usuário no backend (JSON server)
        const response = await fetch(`${API_USUARIOS_URL}/${usuarioId}`);
        if (!response.ok) {
            throw new Error('Falha ao carregar os dados do usuário.');
        }

        const usuario = await response.json(); // Converte pra JSON
        const favoritos = usuario.favoritos || []; // Se não tiver nada, vira array vazio

        container.innerHTML = ""; // Limpa o conteúdo anterior

        // Se não tiver nenhum favorito, mostra uma mensagem
        if (favoritos.length === 0) {
            container.innerHTML = `
                <div class="text-center mt-5">
                    <p class="fs-4">Você ainda não adicionou nenhum curso aos favoritos.</p>
                    <a href="../cursos/cursos.html" class="btn btn-info">Explorar Cursos</a>
                </div>`;
            return;
        }

        const row = document.createElement("div"); // Cria uma linha pra organizar os cards
        row.className = "row";

        // Para cada curso favorito, monta um card e coloca na tela
        favoritos.forEach(curso => {
            const col = document.createElement("div");
            col.className = "col-12 col-md-6 col-lg-3 mb-4";
            col.setAttribute('data-curso-card-id', curso.id); // Marca o ID do curso no elemento

            // Monta o HTML do card do curso
            col.innerHTML = `
                <div class="card h-100 shadow">
                    <img src="${curso.imagem}" class="card-img-top" alt="${curso.nome}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-center">${curso.nome}</h5>
                        <p class="card-text">${curso.instituicao}</p>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <a href="${curso.link}" class="btn btn-primary flex-grow-1 me-2" target="_blank">Saiba Mais</a>
                            <button class="btn btn-danger remove-favorito-btn" title="Remover dos Favoritos" data-curso-id="${curso.id}" data-curso-nome="${curso.nome}">
                                <i class="bi bi-trash-fill"></i> </button>
                        </div>
                    </div>
                </div>
            `;
            row.appendChild(col); // Adiciona o card na linha
        });

        container.appendChild(row); // Joga a linha com os cards no container
        adicionarListenersRemocao(usuarioId, container); // Ativa os botões de remover

    } catch (error) {
        console.error("Erro ao carregar favoritos:", error); // Mostra o erro no console
        container.innerHTML = "<p class='text-center text-danger'>Ocorreu um erro ao carregar seus favoritos. Tente novamente mais tarde.</p>";
    }
}

// Essa função ativa os botões de remover dos favoritos
function adicionarListenersRemocao(usuarioId, container) {
    document.querySelectorAll('.remove-favorito-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const cursoNomeParaRemover = event.currentTarget.dataset.cursoNome; // Nome que vai aparecer na confirmação
            const cursoCardId = event.currentTarget.dataset.cursoId; // ID pra achar o card e remover

            // Mensagem antes de excluir
            if (!confirm(`Tem certeza que deseja remover "${cursoNomeParaRemover}" dos seus favoritos?`)) {
                return;
            }

            try {
                // Busca os dados atualizados do usuário
                const userResponse = await fetch(`${API_USUARIOS_URL}/${usuarioId}`);
                if (!userResponse.ok) throw new Error("Não foi possível buscar dados do usuário.");
                const usuario = await userResponse.json();

                // Tira o curso da lista de favoritos
                const favoritosAtualizados = usuario.favoritos.filter(fav => fav.nome !== cursoNomeParaRemover);

                // Manda a lista nova pro json server
                const patchResponse = await fetch(`${API_USUARIOS_URL}/${usuarioId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({favoritos: favoritosAtualizados})
                });

                if (!patchResponse.ok) throw new Error("Não foi possível atualizar os favoritos no servidor.");

                // Atualiza o localStorage com os dados novos
                const usuarioAtualizadoNoServidor = await patchResponse.json();
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizadoNoServidor));

                // Remove com o card da tela
                const cardParaRemover = container.querySelector(`.col-12[data-curso-card-id="${cursoCardId}"]`);
                if (cardParaRemover) {
                    cardParaRemover.remove();
                }

                alert(`"${cursoNomeParaRemover}" foi removido dos favoritos.`); // Mensagem de sucesso

                // Se não tiver mais nenhum card mostra a mensagem de vazio
                if (container.querySelectorAll('.card').length === 0) {
                    container.innerHTML = `
                        <div class="text-center mt-5">
                            <p class="fs-4">Você ainda não adicionou nenhum curso aos favoritos.</p>
                            <a href="../cursos/cursos.html" class="btn btn-info">Explorar Cursos</a>
                        </div>`;
                }

            } catch (error) {
                console.error("Erro ao remover favorito:", error); // Mostra o erro no console
                alert("Ocorreu um erro ao remover o curso dos favoritos."); // Mensagem de erro pro usuário
            }
        });
    });
}
