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
            comentario: novo_comentario
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
        `;
    });
    document.getElementById('comentarios-container').innerHTML = html;
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

