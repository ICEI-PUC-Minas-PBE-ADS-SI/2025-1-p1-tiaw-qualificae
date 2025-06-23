// Guardamos as curtidas e descurtidas em listas
let listaCurtidas = [];
let listaDescurtidas = [];

// ID do usuário testes
const usuarioAtual = 1;

// Função chamada ao clicar em "Curtir"
function curtir() {
  listaCurtidas = JSON.parse(localStorage.getItem("curtidas")) || [];
  listaDescurtidas = JSON.parse(localStorage.getItem("descurtidas")) || [];

  // Verificador para remover dislike se existir
  listaDescurtidas = listaDescurtidas.filter(id => id !== usuarioAtual);

  // Alterna curtida
  if (listaCurtidas.includes(usuarioAtual)) {
    listaCurtidas = listaCurtidas.filter(id => id !== usuarioAtual);
  } else {
    listaCurtidas.push(usuarioAtual);
  }

  // Salva no localStorage
  localStorage.setItem("curtidas", JSON.stringify(listaCurtidas));
  localStorage.setItem("descurtidas", JSON.stringify(listaDescurtidas));

  atualizarTela();
}

// Função chamada ao clicar em "Não Curtir"
function naoCurtir() {
  listaCurtidas = JSON.parse(localStorage.getItem("curtidas")) || [];
  listaDescurtidas = JSON.parse(localStorage.getItem("descurtidas")) || [];

  // Verificador para remover curtida se existir
  listaCurtidas = listaCurtidas.filter(id => id !== usuarioAtual);

  // Alterna descurtida
  if (listaDescurtidas.includes(usuarioAtual)) {
    listaDescurtidas = listaDescurtidas.filter(id => id !== usuarioAtual);
  } else {
    listaDescurtidas.push(usuarioAtual);
  }

  localStorage.setItem("curtidas", JSON.stringify(listaCurtidas));
  localStorage.setItem("descurtidas", JSON.stringify(listaDescurtidas));

  atualizarTela();
}

// Atualiza contadores e aparência dos ícones
function atualizarTela() {
  listaCurtidas = JSON.parse(localStorage.getItem("curtidas")) || [];
  listaDescurtidas = JSON.parse(localStorage.getItem("descurtidas")) || [];

  // Atualiza os números
  document.getElementById("counting-likes").innerText = listaCurtidas.length;
  document.getElementById("counting-dislikes").innerText = listaDescurtidas.length;

  const iconeCurtir = document.getElementById("like-icon");
  const iconeNaoCurtir = document.getElementById("dislike-icon");

  // Reseta as classes
  iconeCurtir.className = "bi bi-hand-thumbs-up fs-2";
  iconeNaoCurtir.className = "bi bi-hand-thumbs-down fs-2";

  if (listaCurtidas.includes(usuarioAtual)) {
    iconeCurtir.classList.add("like");
  }

  if (listaDescurtidas.includes(usuarioAtual)) {
    iconeNaoCurtir.classList.add("dislike");
  }
}

// Carrega os dados salvos ao iniciar
atualizarTela();
