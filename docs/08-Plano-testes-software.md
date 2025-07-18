# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="03-Product-design.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

O plano de testes de software é gerado a partir da especificação do sistema e consiste em casos de teste que deverão ser executados quando a implementação estiver parcial ou totalmente pronta. Apresente os cenários de teste utilizados na realização dos testes da sua aplicação. Escolha cenários de teste que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico, o grupo deve detalhar quais funcionalidades foram avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

Não deixe de enumerar os casos de teste de forma sequencial e garantir que o(s) requisito(s) associado(s) a cada um deles esteja(m) correto(s) — de acordo com o que foi definido na <a href="03-Product-design.md">Especificação do projeto</a>.

Por exemplo:

| **Caso de teste**  | **CT-001 – Cadastrar perfil**  |
|:---: |:---: |
| Requisito associado | RF-001 - A aplicação deve apresentar, na página principal, a funcionalidade de cadastro de usuários para que estes consigam criar e gerenciar seu perfil. |
| Objetivo do teste | Verificar se o usuário consegue se cadastrar na aplicação. |
| Passos | - Acessar o navegador. <br> - [LINK DO SITE](https://two025-1-p1-tiaw-qualificae.onrender.com/index.html). <br> - Clicar em "Criar conta". <br> - Preencher os campos obrigatórios (e-mail, nome, sobrenome, celular, CPF, senha, confirmação de senha). <br> - Aceitar os termos de uso. <br> - Clicar em "Registrar". |
| Critério de êxito | O cadastro foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Victor Hugo |

<br>

| **Caso de teste**  | **CT-002 – Efetuar login**  |
|:---: |:---: |
| Requisito associado | RF-002 - A aplicação deve possuir opção de fazer login, sendo o login o endereço de e-mail. |
| Objetivo do teste | Verificar se o usuário consegue realizar login. |
| Passos | - Acessar o navegador <br> -  [LINK DO SITE](https://two025-1-p1-tiaw-qualificae.onrender.com/index.html). <br> - Clicar no botão "Entrar" <br> - Preencher o campo de e-mail <br> - Preencher o campo de senha <br> - Clicar em "Login". |
| Critério de êxito | O login foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Victor Hugo |

<br>

| **Caso de teste**  | **CT-003 – Ver os cursos disponíveis na minha área**  |
|:---: |:---: |
| Requisito associado | RF-003 - A aplicação deve possuir uma página que mostre os cursos disponíveis. |
| Objetivo do teste | Verificar se o usuário consegue ter acesso aos cursos cadastrados no sistema. |
| Passos | - Acessar o navegador. <br> -  [LINK DO SITE](https://two025-1-p1-tiaw-qualificae.onrender.com/index.html). <br> - No Menu Principal, clicar em “Cursos”. <br> - Navegar na pagina a procura do curso de seu interesse. <br> |
| Critério de êxito | Ter acesso a página onde estarão os Cursos. |
| Responsável pela elaboração do caso de teste | Emanuelle Barbosa |

<br>

| **Caso de teste**  | **CT-004 – Incluir informações no meu currículo**  |
|:---: |:---: |
| Requisito associado | RF-004 - A aplicação deve possuir uma aba onde possa criar um currículo de acordo com as informações prestadas. |
| Objetivo do teste | Verificar se a aplicação está capacitada de incluir dados ao Currículo. |
| Passos | - Acessar o navegador. <br> - [LINK DO SITE](https://two025-1-p1-tiaw-qualificae.onrender.com/index.html). <br> - Clicar em “Currículos”. <br> - Preencher os campos  que o usuário queira colocar no currículo. <br> - Clicar em "Salvar". <br> |
| Critério de êxito | O Currículo deve ser salvo e permanecer com os dados registrados. |
| Responsável pela elaboração do caso de teste. | Arthur Moreira |

<br>


| **Caso de teste**  | **CT-005 – Gerar o currículo depois de pronto**  |
|:---: |:---: |
| Requisito associado | RF-006 - Deverá permitir que o usuário gere o currículo e transforme em PDF ou então imprima o mesmo.|
| Objetivo do teste | Verificar se o usuário está impossibilitado de gerar o currículo como PDF ou se desejar Imprima o currículo. |
| Passos | - Acessar o navegador. <br> - [LINK DO SITE](https://two025-1-p1-tiaw-qualificae.onrender.com/index.html). <br> - Clicar em “Currículos”. <br> - Clicar em “Salvar”. <br> - Clicar em “Gerar PDF”. <br> |
| Critério de êxito | PDF ser gerado como o esperado. |
| Responsável pela elaboração do caso de teste | Júlio César |

<br>

| **Caso de teste**  | **CT-006 – O sistema deve permitir favoritar os cursos**  |
|:---: |:---: |
| Requisito associado | RF-007 - Deverá possuir um botão nos cursos para torna-los “favoritos”. |
| Objetivo do teste | Verificar se o usuário está possibilitado favoritar os cursos do site Qualificaê! . |
| Passos | - Acessar o navegador. <br> - [LINK DO SITE](https://two025-1-p1-tiaw-qualificae.onrender.com/index.html). <br> - Clicar em “Cursos”. <br> - Clicar na Bandeira relacionada aos favoritos. <br>|
| Critério de êxito | Adicionar o Curso aos seus favoritos. |
| Responsável pela elaboração do caso de teste | Emanuelle Barbosa |

<br>

| **Caso de teste**  | **CT-007 – Visualizar os cursos favoritados**  |
|:---: |:---: |
| Requisito associado | RF-008 - O sistema deverá permitir ao usuário acessar a página de favoritos. |
| Objetivo do teste | Acessar os cursos anteriormente marcados como favoritos. |
| Passos | - Acessar o navegador. <br> - [LINK DO SITE](https://two025-1-p1-tiaw-qualificae.onrender.com/index.html). <br> - Clicar em “Favoritos”. <br> - Clicar na Bandeira relacionada aos favoritos. <br> - abre a página com o nome do usuário|
| Critério de êxito | Visualizar os cursos anteriormente selecionados. |
| Responsável pela elaboração do caso de teste | Caio Neri |

<br>

| **Caso de teste**  | **CT-008 – Pesquisa por nome**  |
|:---: |:---: |
| Requisito associado | RF-009 - O sistema deverá permitir ao usuário pesquisar os cursos por seus nomes. |
| Objetivo do teste | Verificar se o usuário está impossibilitado de usar a ferramenta de pesquisa dos cursos. |
| Passos | - Acessar o navegador. <br> - [LINK DO SITE](https://two025-1-p1-tiaw-qualificae.onrender.com/index.html). <br> - Clicar em “Cursos”. <br> - Utilizar a Barra de Pesquisa. |
| Critério de êxito | Realizar a busca desejada. |
| Responsável pela elaboração do caso de teste | Beatriz Keppel |

<br>

| **Caso de teste**  | **CT-009 – Realizar avaliações sobre o site**  |
|:---: |:---: |
| Requisito associado | RF-010 - O sistema deverá permitir o usuário avaliar o funcionamento e experiência com a aplicação |
| Objetivo do teste | Verificar se o usuário está capacitado de utilizar a ferramenta de avaliação do site |
| Passos | - Acessar o navegador <br> - [LINK DO SITE](https://two025-1-p1-tiaw-qualificae.onrender.com/index.html). <br> - Clicar em no ícone da avaliação <br> - Fornecer a nota desejada ao site <br> - Escrever um comentário desejado <br> - Clicar em “Enviar”|
| Critério de êxito | Avaliação Salva na página. |
| Responsável pela elaboração do caso de teste | Caio Neri |


<br>

| **Caso de teste**  | **CT-010 – Fórum**  |
|:---: |:---: |
| Requisito associado | RF-011 - O sistema deve fornecer uma página de fórum para os usuários interagirem entre si.|
| Objetivo do teste | Permitir que os usuários compartilhem entre si a sua experiência com o site.|
| Passos | - Acessar o navegador. <br> - [LINK DO SITE](https://two025-1-p1-tiaw-qualificae.onrender.com/index.html). <br> - Clicar em “Forum”. <br> - Escreva um Comentário.  <br> -Clicar em “Enviar”. |
| Critério de êxito | Interação realizada com êxito na pagina do Fórum. |
| Responsável pela elaboração do caso de teste | Júlio César|


<br>

| **Caso de teste**  | **CT-011 – Like e Deslike**  |
|:---: |:---: |
| Requisito associado | RF-012 - Deverá permitir ao usuário avaliar outros comentários de usuários do site. |
| Objetivo do teste | Verificar se os Likes e Deslikes estão sendo registrados corretamente. |
| Passos | - Acessar o navegador. <br> - [LINK DO SITE](https://two025-1-p1-tiaw-qualificae.onrender.com/index.html). <br> - Clicar em “Forum”. <br> - Adicionar um “LIKE”  ou “DESLIKE” em um comentário. |
| Critério de êxito | LIKE ou DESLIKE registrados com êxito. |
| Responsável pela elaboração do caso de teste | Beatriz Keppel |

<br>

| **Caso de teste**  | **CT-012 – Remover favoritos**  |
|:---: |:---: |
| Requisito associado | RF-013 - O sistema deverá permitir ao usuario remover cursos da pagina de favoritos. |
| Objetivo do teste | Verificar se o usuário está possibilitado de remover os cursos de seus favoritos. |
| Passos | OBS: O usuário deverá estar logado. <br> - Acessar o navegador. <br> [LINK DO SITE](https://two025-1-p1-tiaw-qualificae.onrender.com/index.html). <br> - Clicar no ícone dos favoritos. <br> - Clicar no Ícone da lixeira para remover o curso dos favoritos.|
| Critério de êxito | Curso removido da classificação de favoritos. |
| Responsável pela elaboração do caso de teste | Caio Neri |


## Testes executados

- Teste Unitário: Verificamos se cada componente individual do software funciona corretamente. 
- Teste de Integração: Cada componete do software funciona em conjunto sem dar problemas ou conflitos. 
- Teste de Sistema: Verificamos se todo o sistema atende aos requisitos funcionais e não funcionais.
  
Os teste foram feitos durante o processo de desenvolvimento por todos os desenvolvedores e após o site estar pronto.
