// Variável global para armazenar a categoria atual
//A Tela começa com a categoria Negócios
let categoriaAtual = "negocios";

// Função para carregar cursos com filtro por nome
function loadCourses(categoria, termoBusca = "") {
    const container = document.getElementById("cursos-container");
    container.innerHTML = "";

    fetch("http://localhost:3000/curso")
        .then(response => response.json())
        .then(data => {
            // Verifica se a categoria existe no objeto de dados
            if (data[categoria]) {
                const cursosFiltrados = data[categoria].filter(curso =>
                    curso.nome.toLowerCase().includes(termoBusca.toLowerCase())
                );
                //filtra os cursos de acordo com o que foi digitado
                const row = document.createElement("div");
                row.className = "row";

                //Se nenhum curso for encoOntrado.
                if (cursosFiltrados.length === 0) {
                    container.innerHTML = "<p class='text-center'>Nenhum curso encontrado com esse nome.</p>";
                    return;
                }

                cursosFiltrados.forEach(curso => {
                    const col = document.createElement("div");
                    col.className = "col-12 col-sm-6 col-md-6 col-lg-3 mb-4";

                    const card = document.createElement("div");
                    card.className = "card h-100 shadow";


                    card.innerHTML = `
                            <img src="${curso.imagem}" class="card-img-top" alt="${curso.nome}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title text-center">${curso.nome}</h5>
                                <p class="card-text">${curso.instituicao}</p>
                                <div class="d-flex justify-content-between align-items-center mt-auto">
                                    <a href="${curso.link}" class="btn btn-primary flex-grow-1 me-2" target="_blank">Saiba Mais</a>
                                    <button class="btn btn-link p-0 text-primary save-btn" title="Salvar">
                                        <i class="bi bi-bookmark fs-4"></i>
                                    </button>
                                </div>
                            </div>
                        `;

                    col.appendChild(card);
                    row.appendChild(col);
                });

                container.appendChild(row);
            } else {
                container.innerHTML = "<p>Categoria não encontrada! Tente Novamente</p>";
            }
        })
        .catch(error => {
            console.error("Erro ao carregar cursos:", error);
            container.innerHTML = "<p>Erro ao carregar cursos!</p>";
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadCourses(categoriaAtual);

    // Configura os botões de categoria
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            categoriaAtual = button.getAttribute('data-category');
            const termoBusca = document.getElementById("search-input").value;
            loadCourses(categoriaAtual, termoBusca);

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