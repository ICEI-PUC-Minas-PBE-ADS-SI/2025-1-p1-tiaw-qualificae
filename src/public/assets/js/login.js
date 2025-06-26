// Configuração global
const API_URL = '/usuarios';

/* 3.1 Gerenciamento de Mensagens
---------------------------------------- */
function displayMessage(msg, isError = false) {
    const oldMessage = document.getElementById('message');
    if (oldMessage) oldMessage.remove();

    const messageDiv = document.createElement('div');
    messageDiv.id = 'message';
    messageDiv.textContent = msg;
    if (isError) messageDiv.classList.add('error');

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.3s ease-in-out';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

var usuarios = [];

async function carregarUsuarios() {
    const response = await fetch(API_URL);
    usuarios = await response.json();
}

// Carrega os usuários ao iniciar

// Função chamada no onsubmit do formulário
function validarLogin(event) {
    event.preventDefault();

    const email = document.getElementById("username").value.trim().toLowerCase();
    const senha = document.getElementById("password").value;

    if (usuarios.length === 0) {
        alert('Os dados dos usuários ainda não foram carregados.');
        return;
    }

    // Verifica se existe um usuário com email *e* senha corretos
    const usuario = usuarios.find(u =>
        u.email.toLowerCase() === email && u.senha === senha
    );

    if (usuario) {
        alert(`Bem-vindo, ${usuario.nome}!`);
        sessionStorage.setItem('usuarioCorrente', JSON.stringify({
            id: usuario.id,
            login: usuario.login,
            email: usuario.email,
            nome: usuario.nome
        }));
        window.location.href = "/";
    } else {
        alert("Usuário ou senha incorretos!");
    }
}

/* async function validarLogin(event) {
   event.preventDefault();

   const email = document.getElementById('username').value.trim().toLowerCase();
   const senha = document.getElementById('password').value;

   try {
     const response = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`);

     if (!response.ok) {
       throw new Error('Resposta do servidor não OK');
     }

     const usuarios = await response.json(); // já é um array direto no JSON Server

     const usuario = usuarios.find(u => u.email.toLowerCase() === email);

     if (!usuario) {
       displayMessage('Usuário não encontrado!', true);
       return;
     }

     if (usuario.senha === senha) {
       sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuario));
       displayMessage('Login realizado! Redirecionando...');
       setTimeout(() => window.location.href = "usuario.html", 1000);
     } else {
       displayMessage('Senha incorreta!', true);
     }
   } catch (error) {
     displayMessage('Erro ao conectar com o servidor', true);
     console.error("Erro no login:", error);
   }
 }
*/

/* 3.3 Cadastro de Usuário
---------------------------------------- */
async function cadastrarUsuario(event) {
    event.preventDefault();

    const novoUsuario = {
        nome: document.getElementById('nome_completo').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        telefone: document.getElementById('telefone').value,
        data_nascimento: document.getElementById('data_nascimento').value,
        cidade: document.getElementById('cidade').value,
        linkedin: document.getElementById('linkedin').value || null,
    };

    const confirmarSenha = document.getElementById('confirmar_senha').value;

    // Validações
    if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
        displayMessage('Preencha todos os campos obrigatórios!', true);
        return;
    }

    if (novoUsuario.senha !== confirmarSenha) {
        displayMessage('As senhas não coincidem!', true);
        return;
    }

    // Validação de idade
    const nascimento = new Date(novoUsuario.data_nascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    try {
        const checkEmail = await fetch(`${API_URL}?email=${encodeURIComponent(novoUsuario.email)}`);
        const existente = await checkEmail.json();

        if (existente.length > 0) {
            displayMessage('Este e-mail já está cadastrado!', true);
            return;
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoUsuario)
        });

        if (response.ok) {
            displayMessage('Cadastro realizado com sucesso! Redirecionando...');
            document.getElementById('username').value = novoUsuario.email;
            await carregarUsuarios();
            setTimeout(() => voltarParaLogin(), 1500);
        } else {
            throw new Error('Falha no cadastro');
        }
    } catch (error) {
        console.error("Erro no cadastro:", error);
        displayMessage("Erro ao cadastrar. Tente novamente mais tarde.", true);
    }
}

/* 3.4 Alternância de Formulários
---------------------------------------- */
function mostrarFormularioCadastro() {
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('register-box').style.display = 'block';
    document.getElementById('nome_completo').focus();
}

function voltarParaLogin() {
    document.getElementById('register-box').style.display = 'none';
    document.getElementById('login-box').style.display = 'block';
    document.getElementById('username').focus();
}

/* 3.5 Utilitários
---------------------------------------- */
// Máscara para telefone
document.getElementById('telefone')?.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
    if (value.length > 10) value = `${value.substring(0, 10)}-${value.substring(10, 14)}`;
    e.target.value = value;
});

// Foco automático
document.addEventListener('DOMContentLoaded', async function () {
    await carregarUsuarios();
    document.getElementById('username')?.focus();
});
