# Product design

<span style="color:red">Pré-requisitos: <a href="02-Product-discovery.md"> Product discovery</a></span>


## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | cadastrar no sistema | que eu possa fazer a criação da minha conta no site|
|Usuário do sistema | fazer login  |  que eu possa acessar os dados da minha conta |
|Usuário do sistema | ver os cursos disponíveis na minha área  | que eu possa acessá-los e conhecer para realizá-los |
|Usuário do sistema | pesquisar cursos disponíveis | que eu possa encontrar o que eu preciso |
|Usuário do sistema | quero incluir informações no meu currículo | que eu possa especificar meus dados e montar meu currículo com base nas minhas habilidades desenvolvidas e requisitos da vaga |
|Usuário do sistema | editar os dados inseridos no meu currículo | que eu possa modificar ou acrescentar informações |
|Usuário do sistema | gerar meu currículo depois de pronto |  que eu possa imprimir ou salvar como pdf |
|Usuário do sistema | favoritar os cursos | que eu possa deixar eles salvos |
|Usuário do sistema | exibir os cursos favoritados | que eu possa ver eles quando preciasar de algum |
|Usuário do sistema | excluir cursos dos favoritos | que eu não misture com os cursos que ainda são do meu interesse |
|Usuário do sistema | fazer comentários no fórum | que outros usuários possam ver minhas ideias |
|Usuário do sistema | dar like ou dislike nos comentários do fórum | que eu possa interagir com outras pessoas |


## Proposta de valor

APRESENTAÇÃO DO DIAGRAMA DA PROPOSTA DE VALOR PARA CADA PERSONA

Persona: Fernando - Estudante
![Proposta de valor 1](images/proposta-valor1.png)

Persona: Thais - Analista de RH
![Proposta de valor 2](images/proposta-valor2.png)

Persona: Guilherme - Desenvolvedor 
![Proposta de valor 3](images/proposta-valor3.png)

Persona: Izabella -  Instrumentadora cirúrgica
![Proposta de valor 4](images/proposta-valor4.png)


## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos funcionais

| ID     | Descrição do Requisito                                     | Prioridade |
| ------ | ---------------------------------------------------------  | ---------- |
| RF-001 | O sistema deve permitir a criação de contas                |  ALTA      |
| RF-002 | O sistema deve permitir realizar login em sua conta        |  ALTA      |
| RF-003 | O sistema deve permitir navegar nos cursos disponíveis     |  ALTA      |
| RF-004 | O sistema deve permitir gerar um currículo                 |  ALTA      |
| RF-005 | O sistema deve permitir incluir informações do currículo   |  ALTA      |
| RF-006 | O sistema deve permitir favoritar os cursos                |  ALTA      |
| RF-007 | O sistema deve permitir o usuário a visualizar os favoritos|  MÉDIA     |
| RF-008 | O sistema deve permitir pesquisar cursos por nome          |  BAIXA     |
| RF-009 | O sistema deve permitir avaliar o site                     |  BAIXA     |
| RF-010 | O sistema deve permitir fazer comentários no fórum         |  MÉDIA     |
| RF-011 | O sistema deve permitir dar like e deslike nos comentários |  MÉDIA     |
| RF-012 | O sistema deve permitir remover curso dos favoritos        |  MÉDIA     |

### Requisitos não funcionais

| ID      | Descrição do Requisito                                                              | Prioridade |
| ------- | ------------------------------------------------------------------------------------- | ---------- |
| RNF-001 | O sistema deve ter interface intuitiva e de fácil navegação | MÉDIA     |
| RNF-002 | O sistema deve funcionar durante 24 horas           | BAIXA      |
| RNF-003 | O sistema deve suportar o acesso de até 1.000 usuários simultâneos | BAIXA      |
| RNF-004 | O sistema deve gerar o currículo em até 30 segundos | BAIXA     |



## Restrições

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| O projeto deverá ser entregue até o final do semestre  |
|002| Não é permitido o desenvolvimento de um módulo de back-end   |
|003| Não é permitido o desenvolvimento de um banco de dados  |
