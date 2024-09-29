# Find.it

Nesse primeiro momento, esse `README` está destinado apenas aos colaboradores.

# Instruções (Gerais)

Certifique-se de estar realizando suas alterações na `branch` apropriada e quando clonar o repositório, execute o script `install_extensions` para instalar as extensões recomendadas para o `VSCode`. O script está dispoível em `.bat` para o `Windows` e `.sh` para o `Linux`. Atenção: é importante que o comando `code` está disponível no terminal para que o script funcione. Selecionei as extensões a dedo e algumas delas estão configuradas para formatar o código ao salvar os arquivos.

# Instruções (Front-end)

Certfique-se de ter instalado o [`Node`](https://nodejs.org/pt) e o [`Pnpm`](https://pnpm.io/pt/installation), de preferência as versões mais recentes.

Para iniciar o servidor `frontend`, acesse a pasta do `frontend` no terminal usando o comando `cd` e depois execute `pnpm dev`. Estão disponíveis também os comandos `pnpm format` (formata o código e aponta falhas manualmente) e o `pnpm fix` (corrige as falhas apontadas). Porém, se as extensões estiverem instaladas e eu fiz tudo corretamente, então tanto a formatação como a correção serão realizadas automaticamente ao salvar o arquivo que está sendo editado.

# Instruções (Back-end)

Tenha o [`Java (JDK 23)`](https://www.oracle.com/br/java/technologies/downloads/) instalado na sua máquina, como também o [`Spring Boot`](https://spring.io/projects/spring-boot).

Para executar, basta clicar com o botão direito mo arquivo [`backend/src/main/java/com/find/it/backend/Application.java`](./backend/src/main/java/com/find/it/backend/Application.java) e selecionar `Run Java`. Isso requer que as extensões recomendadas estejam instaladas.
