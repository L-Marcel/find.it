# Find.it

Aplicação desenvolvida com fins didáticos durante a disciplina de `Web I`, ofertada no `IMD` (Metrópole Digital) na `UFRN`. Nela é possível registrar usuários e, a partir deles, itens perdidos, encontrados ou doados. É uma aplicação de utilização relativamente simples, mas repleta de recursos, com responsividade e focada na experiência do usuário.

# Sumário

- [Autores](#autores)
- [Tomada de decisões](#tomada-de-decisões)
- [Instruções (Gerais)](#instruções-gerais)
- [Instruções (Front-end)](#instruções-front-end)
- [Instruções (Back-end)](#instruções-back-end)
- [Instruções (Produção)](#instruções-produção)
  - [Compilar o modo produção](#compilar-o-modo-produção)
  - [Por que usar o modo produção?](#por-que-usar-o-modo-produção)

# Autores

- [Lucas Marcel](https://github.com/L-Marcel)
- [Henrique Barbosa](https://github.com/Henrique-Barbosaa)
- [Fellipe Souza](https://github.com/Fellpz9)

# Tomada de decisões

Todas as decisões tomadas para o desenvolvimento dessa aplicação foram feitas levando em conta os interesses e conhecimentos dos membros do grupo. E como o foco é o `Front-end` nessa disciplina, também deixamos de lado algumas coisas no `Back-end`. Por exemplo: não estamos criptografando as senhas no banco de dados (então nada de usar senhas reais, viu?).

# Instruções (Gerais)

Certifique-se de estar realizando suas alterações na `branch` apropriada e quando clonar o repositório, execute o script `scripts/install_extensions` para instalar as extensões recomendadas para o `VSCode`. O script está dispoível em `.bat` para o `Windows` e `.sh` para o `Linux`. Para tal é importante que o comando `code` está disponível no terminal para que o script funcione. Selecionei as extensões a dedo e algumas delas estão configuradas para formatar o código ao salvar os arquivos.

Para facilitar, se você já tiver o [`Pnpm`](https://pnpm.io/pt/installation) instalado, basta executar um dos seguintes comandos (variando entre `Windows` e `Linux`):

```cmd
pnpm windows:extensions
```

```cmd
pnpm linux:extensions
```

> Se alguma das extensões já estiverem instaladas, infelizmente esse comando vai falhar. Porém, as extensões também estão como recomendadas nas configurações do projeto.

# Instruções (Front-end)

Certfique-se de ter instalado o [`Node`](https://nodejs.org/pt) e o [`Pnpm`](https://pnpm.io/pt/installation), de preferência as versões mais recentes.

Para iniciar o servidor `frontend`, acesse a pasta do `frontend` no terminal usando o comando `cd`, execute `pnpm install` para instalar as dependências e depois execute `pnpm dev`. Estão disponíveis também os comandos `pnpm format` (formata o código e aponta falhas) e o `pnpm fix` (corrige as falhas apontadas). Porém, se as extensões estiverem instaladas e fizemos tudo corretamente, então tanto a formatação como a correção serão realizadas automaticamente ao salvar o arquivo que está sendo editado.

# Instruções (Back-end)

Tenha o [`Java (JDK 21 ou 23)`](https://www.oracle.com/br/java/technologies/downloads/) instalado na sua máquina, como também o [`Maeven`](https://maven.apache.org/install.html).

Para executar, basta clicar com o botão direito mo arquivo [`backend/src/main/java/com/find/it/backend/Application.java`](./backend/src/main/java/com/find/it/backend/Application.java) e selecionar `Run Java`. Isso requer que as extensões recomendadas estejam instaladas.

> _Atenção_: É muito importante que a aplicação Java esteja sendo executada no diretório raíz do projeto, que é onde se encontra pasta [`data`](./data). Caso contrário, ele criará uma nova pasta e um novo banco de dados e você precisará adicionar nela as pasta [`data/users`](./data/users) e [`data/items`](./data/items).

# Instruções (Produção)

Para facilitar lidar com o modo produção, há uma série de `scripts` desenvolvidos tanto para o `Windows` como para o `Linux`. Todos executáveis por comandos do [`Pnpm`](https://pnpm.io/pt/installation) na raíz do projeto (tem que está fora da pasta `frontend` e `backend` para executar).

## Compilar o modo produção

Não é tão trivial a sequência de passos que seguiremos, portanto, é importante atenção. Antes de mais nada, certifique-se de ter aberto o terminal (ou o `VSCode`) como administrador e que a variável de ambiente `JAVA_HOME` está bem definida. O primeiro comando a executar é o de `build` do `backend`:

```cmd
pnpm windows:backend:build
```

```cmd
pnpm linux:backend:build
```

Feito isso, é importante colocar o `backend` para rodar no modo `produção` antes de compilar o `frontend`:

```cmd
pnpm windows:backend
```

```cmd
pnpm linux:backend
```

Atenção: o `backend` costuma demorar bastante para iniciar completamente. E geralmente termina com um aviso como esse: "Mass indexing complete."

Em seguinda, em outro terminal, mas também na raíz do projeto e mantendo o `backend` rodando, devemos executar o `build` do `frontend`:

```cmd
pnpm windows:frontend:build
```

```cmd
pnpm linux:frontend:build
```

> Ao contrário do `backend`, o modo produção do `frontend` sempre será recompilado ao chamar o `build`. Portanto, ele sempre demora.

Por fim, podemos iniciar o `frontend` no modo `produção`:

```cmd
pnpm windows:frontend
```

```cmd
pnpm linux:frontend
```

> Uma vez que temos o `backend` e o `frontend` compilados, podemos ignorar os comandos de `build`, mas é bom manter a ordem de execução por questão de cache do frontend.

## Por que usar o modo produção?

Embora não temos como objetivo realizar o `deploy` dessa aplicação (não vai ser necessário), esse modo é extremamente mais rápido, já que é compilado com antecedência.
