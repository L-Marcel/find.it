# Find.it

Nesse primeiro momento, esse `README` está destinado apenas aos colaboradores.

# Instruções (Gerais)

Certifique-se de estar realizando suas alterações na `branch` apropriada e quando clonar o repositório, execute o script `install_extensions` para instalar as extensões recomendadas para o `VSCode`. O script está dispoível em `.bat` para o `Windows` e `.sh` para o `Linux`. Atenção: é importante que o comando `code` está disponível no terminal para que o script funcione. Selecionei as extensões a dedo e algumas delas estão configuradas para formatar o código ao salvar os arquivos.

# Instruções (Front-end)

Certfique-se de ter instalado o [`Node`](https://nodejs.org/pt) e o [`Pnpm`](https://pnpm.io/pt/installation), de preferência as versões mais recentes.

Para iniciar o servidor `frontend`, acesse a pasta do `frontend` no terminal usando o comando `cd`, execute `pnpm install` para instalar as dependências e depois execute `pnpm dev`. Estão disponíveis também os comandos `pnpm format` (formata o código e aponta falhas manualmente) e o `pnpm fix` (corrige as falhas apontadas). Porém, se as extensões estiverem instaladas e eu fiz tudo corretamente, então tanto a formatação como a correção serão realizadas automaticamente ao salvar o arquivo que está sendo editado.

# Instruções (Back-end)

Tenha o [`Java (JDK 23)`](https://www.oracle.com/br/java/technologies/downloads/) instalado na sua máquina, como também o [`Spring Boot`](https://spring.io/projects/spring-boot) e o [`Maeven`](https://maven.apache.org/install.html).

Para executar, basta clicar com o botão direito mo arquivo [`backend/src/main/java/com/find/it/backend/Application.java`](./backend/src/main/java/com/find/it/backend/Application.java) e selecionar `Run Java`. Isso requer que as extensões recomendadas estejam instaladas.

_Atenção_: É muito importante que a aplicação Java esteja sendo executada no diretório raíz do projeto, que é onde se encontra pasta [`data`](./data). Caso contrário, ele criará uma nova pasta e um novo banco de dados e você precisará adicionar nela as pasta [`data/users`](./data/users) e [`data/items](./data/items).
