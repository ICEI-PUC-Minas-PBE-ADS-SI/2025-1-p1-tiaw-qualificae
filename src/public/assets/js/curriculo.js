const API_PDF_URL = 'https://api.pdfshift.io/v3/convert/pdf';
const API_KEY = 'sk_f85cf4a3f37251e0c3aaae35b52b02a1c970a896';

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

async function substituirVariaveisTemplate(html) {
    const perfil_profissional = {
        nome: "Lucas Ferreira da Silva",
        email: "lucas.ferreira@email.com",
        telefone: "(11) 99999-9999",
        linkedin: "https://www.linkedin.com/in/lucas-ferreira-da-silva-11a844242/",
        cidade: "Belo Horizonte-MG",
        resumo_profissional: "Breve resumo das qualificações e experiências relevantes para o cargo",
        habilidades: [
            "Desenvolvimento Full-Stack (JavaScript, TypeScript, Node.js, React, Vue.js)",
            "Banco de Dados SQL e NoSQL (PostgreSQL, MongoDB)",
            "API RESTful e GraphQL",
            "Versionamento de Código (Git, GitHub, GitLab)",
            "Testes Automatizados (Jest, Cypress)",
            "Metodologias Ágeis (Scrum, Kanban)"
        ],
        certificacoes: [
            "Certificação Scrum Foundation – Scrum.org (2023)"
        ],
        formacao_academica: [
            "Cursando Sistemas de Informação na PUC Minas - Betim (previsão de formatura em 2025)",
            "Certificação em Desenvolvimento Web Full-Stack – Alura (2021)",
            "Curso Avançado de React.js – Udemy (2022)"
        ],
        experiencias_profissionais: [
            `Desenvolvedor Full-Stack Tech Solutions LTDA – Janeiro/2022 até o presente.
            Desenvolvimento e manutenção de aplicações web utilizando React e Node.js.
            Integração de APIs RESTful e GraphQL para comunicação entre sistemas.
            Implementação de testes automatizados para garantir a qualidade do código.`
        ]
    }
    let experiencias_profissionais = '';
    perfil_profissional.experiencias_profissionais.forEach(experiencia => experiencias_profissionais += `<li>${experiencia}</li>`)
    let habilidades = '';
    perfil_profissional.habilidades.forEach(habilidade => habilidades += `<li>${habilidade}</li>`);
    let certificacoes = '';
    perfil_profissional.certificacoes.forEach(certificacao => certificacoes += `<li>${certificacao}</li>`);
    let formacao_academica = '';
    perfil_profissional.formacao_academica.forEach(formacao => formacao_academica += `<li>${formacao}</li>`);

    return html.replaceAll("{{NOME}}", perfil_profissional.nome)
        .replace("{{EMAIL}}", perfil_profissional.email)
        .replace("{{TELEFONE}}", perfil_profissional.telefone)
        .replace("{{LINKEDIN}}", perfil_profissional.linkedin)
        .replace("{{CIDADE}}", perfil_profissional.cidade)
        .replace("{{RESUMO_PROFISSIONAL}}", perfil_profissional.resumo_profissional)
        .replace("{{EXPERIENCIA_PROFISSIONAL}}", experiencias_profissionais)
        .replace("{{HABILIDADES}}", habilidades)
        .replace("{{CERTIFICACOES}}", certificacoes)
        .replace("{{EDUCACAO}}", formacao_academica)
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn_gerar_pdf').addEventListener('click', downloadPDF);
});


