async function enviarMsgForum(evento) {
    try {
        let novo_comentario = document.getElementById('msg-forum').value
        novo_comentario = novo_comentario?.trim();
        if (!novo_comentario) {
            throw new Error('Comentário vazio.');
        }
        const comentario = {
            usuario: usuarioCorrente.nome,
            id_usuario: usuarioCorrente.id,
            comentario: novo_comentario,
            curtidas: [],
            descurtidas: []
        };
        comentarios.push(comentario)
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comentario),
        });
        setarHtmlComentarios();
    } catch (e) {
        console.error('Erro ao criar comentário no fórum', e);
    } finally {
        evento.preventDefault();
    }
}

async function onInit() {
    setarConteudoInput();
    await inicializarComentariosForum();
    const form = document.getElementById("form-comentarios");
    form.addEventListener("submit", enviarMsgForum);
    document.getElementById('msg-forum').value = '';
}

function setarConteudoInput() {
    const participeContainer = document.getElementById('participe-container');

    if (usuarioCorrente) {
        participeContainer.innerHTML += `
        <form id="form-comentarios">        
        <div class="input-container">
            <i class="bi bi-chat-square icon"></i>
            <textarea
                    class="form-control"
                    id="msg-forum"
                    placeholder="Escreva algo aqui..."
                    rows="4">
            </textarea>
        </div>
        <div class="py-2 w-100 d-flex justify-content-end">
            <button type="submit" id="btn-enviar-msg" class="btn btn-dark">
                Enviar
            </button>
        </div>
        </form>
        `
    } else {
        participeContainer.innerHTML += `
                <div class="py-2 w-100 d-flex justify-content-center">
            <button
                    class="btn btn-dark"
                    id="btn-fazer-login">
                <a
                        class="text-decoration-none text-white"
                        href="/modulos/login/login.html?origem=/modulos/forum/forum.html">
                    Fazer Login
                </a>
            </button>
        </div>
        `
    }
}

async function buscarComentariosForum() {
    try {
        const res = await fetch(API_URL);
        let data = await res.json();
        comentarios = data.sort((a, b) => b.id - a.id);
    } catch (e) {
        console.error(e);
        displayMessage("Erro ao ler comentários");
    }
}

function setarHtmlComentarios() {
    let html = '';
    comentarios.forEach(comentario => {
        html += `
        <div class="pb-3">
            <span>
                ${comentario.usuario}
            </span>
            <textarea
                    rows="4"
                    readonly
                    class="form-control">${comentario.comentario}</textarea>
        </div>
        <div class="text-center">

        <div class="d-flex align-items-center">
          
          <button onclick="curtir(${comentario.id})" class="icon-button mx-2" aria-label="Curtir">
            <i id="like-icon-${comentario.id}" class="bi bi-arrow-up-square fs-2"></i>
            <span class="counter" id="counter-likes-${comentario.id}">0</span>
          </button>
    
          <button onclick="naoCurtir(${comentario.id})" class="icon-button mx-2" aria-label="Não curtir">
            <i id="dislike-icon-${comentario.id}" class="bi bi-arrow-down-square fs-2"></i>
            <span class="counter" id="counter-dislikes-${comentario.id}">0</span>
          </button>
    
        </div>
    
      </div>
        `;
    });

    document.getElementById('comentarios-container').innerHTML = html;
    comentarios.forEach(comentario => atualizarHTMLComentario(comentario));
}

async function inicializarComentariosForum() {
    await buscarComentariosForum();
    setarHtmlComentarios();
}

const usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
const API_URL = '/forum';
let comentarios = [];

document.addEventListener('DOMContentLoaded', async () => {
    await onInit();
});


async function atualizarComentario(comentario) {
    if (!comentario) {
        throw new Error("Comentário inválido.");
    }
    try {
        const res = await fetch(`${API_URL}/${comentario.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                curtidas: comentario.curtidas,
                descurtidas: comentario.descurtidas
            })
        });
        let data = await res.json();
        return data;
    } catch (e) {
        console.error(e);
        throw new Error("Erro ao atualizar comentário");
    }
}

async function buscarComentarioPorId(comentarioId) {
    if (!comentarioId) {
        throw new Error("Comentário inválido.");
    }
    try {
        const res = await fetch(`${API_URL}?id=${comentarioId}`);
        let data = await res.json();
        if (!data || data.length === 0) {
            throw new Error("Comentário não encontrado");
        }
        return data[0];
    } catch (e) {
        console.error(e);
        throw new Error("Erro ao ler comentários");
    }
}

async function curtir(comentarioId) {
    const comentario = await buscarComentarioPorId(comentarioId);
    if (!comentario) {
        throw new Error("Comentário não encontrado");
    }
    listaCurtidas = comentario.curtidas || [];
    listaDescurtidas = comentario.descurtidas || [];

    // Verificador para remover dislike se existir
    listaDescurtidas = listaDescurtidas.filter(id => id !== usuarioCorrente.id);

    // Alterna curtida
    if (listaCurtidas.includes(usuarioCorrente.id)) {
        listaCurtidas = listaCurtidas.filter(id => id !== usuarioCorrente.id);
    } else {
        listaCurtidas.push(usuarioCorrente.id);
    }

    comentario.curtidas = listaCurtidas;
    comentario.descurtidas = listaDescurtidas;

    // Salva no JSON-Server
    await atualizarComentario(comentario);

    atualizarHTMLComentario(comentario);
}

// Função chamada ao clicar em "Não Curtir"
async function naoCurtir(comentarioId) {
    const comentario = await buscarComentarioPorId(comentarioId);
    if (!comentario) {
        throw new Error("Comentário não encontrado");
    }
    listaCurtidas = comentario.curtidas || [];
    listaDescurtidas = comentario.descurtidas || [];

    // Verificador para remover curtida se existir
    listaCurtidas = listaCurtidas.filter(id => id !== usuarioCorrente.id);

    // Alterna descurtida
    if (listaDescurtidas.includes(usuarioCorrente.id)) {
        listaDescurtidas = listaDescurtidas.filter(id => id !== usuarioCorrente.id);
    } else {
        listaDescurtidas.push(usuarioCorrente.id);
    }

    comentario.curtidas = listaCurtidas;
    comentario.descurtidas = listaDescurtidas;

    await atualizarComentario(comentario);

    atualizarHTMLComentario(comentario);
}

// Atualiza contadores e aparência dos ícones
function atualizarHTMLComentario(comentario) {
    console.log(comentario);

    listaCurtidas = comentario.curtidas || [];
    listaDescurtidas = comentario.descurtidas || [];

    // Atualiza os números
    let counterLikes = document.getElementById(`counter-likes-${comentario.id}`);
    counterLikes.innerText = listaCurtidas.length;
    let counterDeslikes = document.getElementById(`counter-dislikes-${comentario.id}`);
    counterDeslikes.innerText = listaDescurtidas.length;

    const iconeCurtir = document.getElementById(`like-icon-${comentario.id}`);
    const iconeDeslike = document.getElementById(`dislike-icon-${comentario.id}`);

    // Reseta as classes
    iconeCurtir.className = "bi bi-arrow-up-square fs-2";
    counterLikes.className = "counter";
    iconeDeslike.className = "bi bi-arrow-down-square fs-2";
    counterDeslikes.className = "counter";

    if (listaCurtidas.includes(usuarioCorrente.id)) {
        iconeCurtir.classList.add("like");
        counterLikes.classList.add("like");
    }

    if (listaDescurtidas.includes(usuarioCorrente.id)) {
        iconeDeslike.classList.add("dislike");
        counterDeslikes.classList.add("dislike");
    }
}
