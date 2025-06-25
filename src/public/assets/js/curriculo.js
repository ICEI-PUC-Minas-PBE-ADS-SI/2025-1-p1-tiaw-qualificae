const API_PDF_URL = 'https://api.pdfshift.io/v3/convert/pdf';
const API_KEY = 'sk_f85cf4a3f37251e0c3aaae35b52b02a1c970a896';
const usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
const API_USUARIOS_URL = '/usuarios';
var usuario;

async function downloadPDF() {
    const button = document.getElementById('btn_gerar_pdf');
    button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  Gerar PDF';
    button.disabled = true;
    const template = await fetch('../../assets/templates/template_curriculo.html');
    let templateHTML = await template.text();
    templateHTML = await substituirVariaveisTemplate(templateHTML);

    const response = await fetch(API_PDF_URL, {
        method: 'POST',
        headers: {
            'X-API-Key': API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sandbox: true,
            source: templateHTML
        })
    });

    if (!response.ok) {
        console.error('Failed to fetch PDF:', response.statusText);
        return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'curriculo.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    button.disabled = false;
    button.innerHTML = 'Gerar PDF';
}

async function obterUsuarioDb(id) {
    const response = await fetch(`${API_USUARIOS_URL}/${id}`);
    usuario = await response.json();
}

async function substituirVariaveisTemplate(html) {
    await obterUsuarioDb(usuarioCorrente.id);
    const perfil_profissional = {
        nome: usuario.nome,
        email: usuario.email,
        telefone: "(11) 99999-9999",
        linkedin: "https://www.linkedin.com/in/lucas-ferreira-da-silva-11a844242/",
        cidade: "Belo Horizonte-MG",
        descricaoProfissional: usuario.descricaoProfissional,
        habilidadesCompetencias: usuario.habilidadesCompetencias,
        certificacoes: usuario.certificacoes,
        formacaoAcademica: usuario.formacaoAcademica,
        experienciaProfissional: usuario.experienciaProfissional,
    }
    let habilidades = '';
    perfil_profissional.habilidadesCompetencias.forEach(habilidade => habilidades += `<li>${habilidade}</li>`);
    let certificacoes = '';
    perfil_profissional.certificacoes.forEach(certificacao => certificacoes += `<li>${certificacao}</li>`);

    return html.replaceAll("{{NOME}}", perfil_profissional.nome)
        .replace("{{EMAIL}}", perfil_profissional.email)
        .replace("{{TELEFONE}}", perfil_profissional.telefone)
        .replace("{{LINKEDIN}}", perfil_profissional.linkedin)
        .replace("{{CIDADE}}", perfil_profissional.cidade)
        .replace("{{RESUMO_PROFISSIONAL}}", perfil_profissional.descricaoProfissional)
        .replace("{{EXPERIENCIA_PROFISSIONAL}}", perfil_profissional.experienciaProfissional)
        .replace("{{HABILIDADES}}", habilidades)
        .replace("{{CERTIFICACOES}}", certificacoes)
        .replace("{{EDUCACAO}}", perfil_profissional.formacaoAcademica)
}

async function salvarPerfilProfissional(evento) {
    evento.preventDefault();
    try {
        const fotoPerfilElement = document.getElementById('foto-perfil');
        const descricaoProfissional = document.getElementById('descricao-profissional').value;
        const experienciaProfissional = document.getElementById('experiencia-profissional').value;
        const habilidadesCompetencias = document.getElementById('habilidades').value.split(",").map(h => h.trim());
        const formacaoAcademica = document.getElementById('formacao').value;
        const certificacoes = document.getElementById('certificacoes').value.split(",").map(c => c.trim());

        const fotoPerfil = fotoPerfilElement.files[0];

        if (fotoPerfil === null) {
            return;
        }

        const reader = new FileReader();
        reader.onload = async function (e) {
            const base64Image = e.target.result;

            const dadosCurriculo = {
                isPerfilProfissionalPreenchido: true,
                descricaoProfissional,
                fotoPerfil: base64Image,
                experienciaProfissional,
                habilidadesCompetencias,
                formacaoAcademica,
                certificacoes
            };

            await fetch(`${API_USUARIOS_URL}/${usuarioCorrente.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosCurriculo),
            });
            await setarConteudo();
        };
        reader.readAsDataURL(fotoPerfil);
    } catch (e) {
        console.error('Erro ao preencher perfil profissional', e);
    }
}

async function setarConteudo() {
    const conteudoContainer = document.getElementById('conteudo-container');
    if (usuarioCorrente) {
        await this.obterUsuarioDb(usuarioCorrente.id);
        console.log(usuario);
        if (!usuario.isPerfilProfissionalPreenchido) {
            conteudoContainer.innerHTML = `
        <form id="form-perfil-profissional">        
        <div class="container container-top d-flex justify-content-between">
            <div class="vertical-align-center">
                <p style="font-weight: 800">Preencha seu perfil profissional:</p>
            </div>
            <button
                    class="btn btn-dark"
                    style="padding: 16px 24px; width: 134px"
                    type="submit">
                Salvar
            </button>
        </div>

        <div
                class="container"
                style="margin-top: 30px">
            <div class="row">
                <div class="col-6">
                    <div class="input-group">
                <span class="input-group-text">
                  <i class="bi bi-paperclip text-secondary"></i>
                </span>
                        <input
                                accept="image/*"
                                class="form-control"
                                id="foto-perfil"
                                type="file">
                    </div>
                </div>
                <div class="col-6">
                    <div class="input-container">
                        <i class="bi bi-person-fill icon"></i>
                        <input
                                class="form-control"
                                id="descricao-profissional"
                                placeholder="Descrição Profissional">

                        <div style="position: relative !important; height: 0px !important; width: 0px !important; float: left !important;"></div>
                        <div class="form-text">
                            Digite um breve resumo das qualificações e experiências relevantes para o cargo
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mt-3">
            <div class="row">
                <div class="col-6">
                    <p style="font-weight: 600">
                        Habilidades e Competências:
                    </p>
                    <div class="input-container">
                        <i class="bi bi-tools icon"></i>
                        <textarea
                                class="form-control"
                                id="habilidades"
                                name="habilidades"
                                rows="4">
                </textarea>
                        <div style="position: relative !important; height: 0px !important; width: 0px !important; float: left !important;"></div>
                        <div class="form-text">
                            Digite habilidades, conhecimentos, idiomas, premiações...
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <p style="font-weight: 600">
                        Experiência Profissional:
                    </p>
                    <div class="input-container">
                        <i class="bi bi-graph-up icon"></i>
                        <textarea
                                class="form-control"
                                id="experiencia-profissional"
                                name="Experiência Profissional"
                                rows="4">
                    </textarea>
                        <div style="position: relative !important; height: 0px !important; width: 0px !important; float: left !important;"></div>
                        <div class="form-text">
                            Digite suas experiências profissionais, caso tenha.
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mt-3">
            <div class="row">
                <div class="col-6">
                    <p style="font-weight: 600">
                        Formação Acadêmica:
                    </p>
                    <div class="input-container">
                        <i class="bi bi-graph-up icon"></i>
                        <textarea
                                class="form-control"
                                id="formacao"
                                name="Formação Acadêmica"
                                rows="4">
                    </textarea>
                        <div style="position: relative !important; height: 0px !important; width: 0px !important; float: left !important;"></div>
                        <div class="form-text">
                            Digite escolaridade, cursos técnicos, graduação...
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <p style="font-weight: 600">
                        Certificações
                    </p>
                    <div class="input-container">
                        <i class="bi bi-newspaper icon"></i>
                        <textarea
                                class="form-control"
                                id="certificacoes"
                                rows="4">
                        </textarea>
                        <div style="position: relative !important; height: 0px !important; width: 0px !important; float: left !important;"></div>
                        <div class="form-text">
                            Digite escolaridade, cursos técnicos, graduação...
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </form>
        `;
            const form = document.getElementById("form-perfil-profissional");
            form.addEventListener("submit", salvarPerfilProfissional);
            return;
        }
        habilidadesCompetencias = '';
        usuario.habilidadesCompetencias.forEach(habilidade => habilidadesCompetencias += `<li>${habilidade}</li>`);
        conteudoContainer.innerHTML = `
            <div class="d-flex justify-content-center align-items-center">
                <button id="btn_gerar_pdf" class="btn btn-dark">
                    Gerar PDF
                </button>
            </div>
            <div
            style="margin-top: 26px" 
            class="container">
            <div class="row">
                <div class="col-12 d-flex justify-content-center">
                    <div class="text-center">
                        <p style="margin-bottom: 0; letter-spacing: -0.72px; font-weight: 800"; text-shadow: 0px 8px 35px rgba(0, 0, 0, 0.16);>
                            Seu perfil profissional:
                        </p>
                        <img
                                class="rounded-circle mb-2 mt-4"
                                height="100"
                                width="100"
                                src="${usuario.fotoPerfil}" />
                        <p
                        class="text-dark"
                         style="margin-bottom: 0 !important; font-weight: 600">
                            ${usuario.nome}
                        </p>
                        <span
                        class="text-dark"
                         style="font-weight: 400; font-size: 20px">
                            ${usuario.email}
                        </span>
                    </div>
                </div>
            </div>
            <div
            style="margin: 50px 0"
             class="row text-dark">
                <div class="col-4">
                    <p style="font-weight: 600">
                        Habilidades e Competências
                    </p>
                    ${habilidadesCompetencias}
                </div>
                <div class="col-4">
                    <p style="font-weight: 600">
                        Experiência Profissional
                    </p>
                    ${usuario.experienciaProfissional}
                </div>
                <div class="col-4">
                    <p style="font-weight: 600">
                        Formação Acadêmica
                    </p>
                    ${usuario.formacaoAcademica}
                </div>
            </div>
        </div>
        `;
        document.getElementById('btn_gerar_pdf').addEventListener('click', downloadPDF);
        return;
    }
    conteudoContainer.innerHTML = `
        <div class="py-2 w-100 d-flex justify-content-center">
            <button
                    class="btn btn-dark"
                    id="btn-fazer-login">
                <a
                        class="text-decoration-none text-white"
                        href="/modulos/login/login.html?origem=/modulos/cadastro/cadastro.html">
                    Fazer Login
                </a>
            </button>
        </div>
    `
}

async function onInit() {
    await setarConteudo();
}


document.addEventListener('DOMContentLoaded', async function () {
    await onInit();
});


