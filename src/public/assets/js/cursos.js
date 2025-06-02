// Variável global para armazenar a categoria atual
// A tela começa exibindo cursos da categoria "negócios"
let categoriaAtual = "negocios";

// Função para carregar cursos com filtro por nome (se houver)
function loadCourses(categoria, termoBusca = "") {
    // Pega o container onde os cursos serão exibidos
    const container = document.getElementById("cursos-container");

    // Limpa o container antes de exibir novos cursos
    container.innerHTML = "";

    // Busca os dados do JSON Server
    fetch("http://localhost:3001/curso")
        .then(response => response.json())
        .then(data => {
            // Verifica se a categoria existe no JSON
            if (data[categoria]) {
                // Filtra os cursos pelo termo de busca (se informado)
                const cursosFiltrados = data[categoria].filter(curso =>
                    curso.nome.toLowerCase().includes(termoBusca.toLowerCase())
                );

                // Caso nenhum curso seja encontrado
                if (cursosFiltrados.length === 0) {
                    container.innerHTML = "<p class='text-center'>Nenhum curso encontrado com esse nome.</p>";
                    return;
                }

                // Cria uma linha (row) para os cards usando Bootstrap
                const row = document.createElement("div");
                row.className = "row";

                // Cria os cards para os cursos encontrados
                cursosFiltrados.forEach(curso => {
                    const col = document.createElement("div");
                    col.className = "col-12 col-sm-6 col-md-6 col-lg-3 mb-4"; // Responsividade

                    const card = document.createElement("div");
                    card.className = "card h-100 shadow"; // Define a altura e sombra do card

                    // Monta o conteúdo do card com os dados do curso
                    card.innerHTML = `
                        <img src="${curso.imagem}" class="card-img-top" alt="${curso.nome}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title text-center">${curso.nome}</h5>
                            <p class="card-text">${curso.instituicao}</p>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <a href="${curso.link}" class="btn btn-primary flex-grow-1 me-2" target="_blank">Saiba Mais</a>
                                <button class="btn btn-link p-0 text-primary save-btn" title="Salvar">
                                    <i class="bi bi-bookmark fs-4 text-secondary"></i>
                                </button>
                            </div>
                        </div>
                    `;

                    // Adiciona o card à coluna e a coluna à linha
                    col.appendChild(card);
                    row.appendChild(col);
                });

                // Adiciona a linha de cards ao container principal
                container.appendChild(row);
            } else {
                // Categoria não encontrada no JSON
                container.innerHTML = "<p>Categoria não encontrada! Tente novamente.</p>";
            }
        })
        .catch(error => {
            // Trata erros de requisição
            console.error("Erro ao carregar cursos:", error);
            container.innerHTML = "<p>Erro ao carregar cursos! Estamos trabalhando para resolver isso.</p>";
        });

    setTimeout(() => {
        if (typeof marcarFavoritos === "function") {
            marcarFavoritos();
        }
    }, 300);
}

// Quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    // Exibe os cursos da categoria padrão
    loadCourses(categoriaAtual);

    // Configura os botões de categoria
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Atualiza a categoria atual com base no botão clicado
            categoriaAtual = button.getAttribute('data-category');

            // Pega o valor atual do campo de busca
            const termoBusca = document.getElementById("search-input").value;

            // Carrega os cursos filtrando por categoria e busca
            loadCourses(categoriaAtual, termoBusca);

            // Atualiza o visual do botão ativo
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Configura o campo de pesquisa
    document.getElementById("search-input").addEventListener("input", (e) => {
        const termoBusca = e.target.value;
        loadCourses(categoriaAtual, termoBusca);
    });
});
