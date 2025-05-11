function exibirCursos(categoria, cursos) {
    const container = document.getElementById('cursos-container');
    container.innerHTML = '';

    const cursosFiltrados = cursos[categoria] || [];

    if (cursosFiltrados.length === 0) {
        container.innerHTML = '<p>Não há cursos disponíveis para esta categoria.</p>';
        return;
    }

    cursosFiltrados.forEach(curso => {
        const cursoElement = document.createElement('div');
        cursoElement.classList.add('col-12', 'col-sm-12', 'col-md-6', 'col-lg-3');

        cursoElement.innerHTML = `
            <div class="card mb-4">
                <img src="${curso.imagem}" class="card-img-top" alt="${curso.nome}">
                <div class="card-body">
                    <h5 class="card-title">${curso.nome}</h5>
                    <p class="card-text">${curso.instituicao}</p>
                    <a href="${curso.link}" class="btn btn-warning" target="_blank">Saiba mais</a>
                </div>
            </div>
        `;

        container.appendChild(cursoElement);
    });
}
