document.addEventListener("DOMContentLoaded", () => {

    // função para carregar os cursos com base na categoria escolhida
    function loadCourses(categoria) {

        // pega o lugar onde os cursos serão exibidos
        const container = document.getElementById("cursos-container");

        // limpa o lugar de abrir (container) para os novos cursos
        container.innerHTML = "";

        // pega os dados de cursos do JSON
        fetch("http://localhost:3000/curso") //caminho que tá abrindo
            .then(response => response.json())
            .then(data => {
                // verifica se a categoria existe no JSON
                if (data[categoria]) {
                    const cursosCategoria = data[categoria];

                    // cria uma única linha usando Bootstrap
                    const row = document.createElement("div");
                    row.className = "row";

                    // cria os cards para os cursos
                    cursosCategoria.forEach(curso => {
                        const col = document.createElement("div");
                        col.className = "col-12 col-sm-6 col-md-6 col-lg-3 mb-4"; // 4 por linha no lg+

                        const card = document.createElement("div");
                        card.className = "card h-100 shadow"; //define a altura do card

                        card.innerHTML = `
                            <img src="${curso.imagem}" class="card-img-top" alt="${curso.nome}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title text-center">${curso.nome}</h5>
                                <p class="card-text">${curso.instituicao}</p>
                                <a href="${curso.link}" class="btn btn-primary mt-auto" target="_blank">Saiba Mais</a>
                            </div>
                        `; //ali montou um html puxando os dados do jsonserver pra exibir na tela

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
                container.innerHTML = "<p>Erro ao carregar cursos! - Estamos trabalhando para que isso não aconteça</p>";
            }); //trata possiveis erros
    }



    // inicializa a exibição dos cursos da categoria padrão quando carregar a página
    loadCourses('negocios');

    // configura os botões para carregar as categorias ao clicar
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            const categoria = button.getAttribute('data-category');
            loadCourses(categoria);

            // Remove classe 'active' de todos os botões
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));

            // Adiciona a classe 'active' ao botão clicado
            button.classList.add('active');
        });
    });
});





