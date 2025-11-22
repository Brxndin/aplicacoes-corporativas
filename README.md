# O que é

Servidor e Aplicativo para a listagem e manipulação de eventos e seus voluntários.



# Objetivo

Desenvolvido para a Prova P1 e P2 da cadeira de Desenvolvimento de Aplicações Corporativas.



# Tecnologias Usadas

Aplicativo:
* React com ViteJS
* Axios
* Selenium

Servidor:
* Express
* JWT
* Prisma
* Winston
* Jest
* Supertest
* JSDoc
* Swagger



# Inicialização e Uso

O projeto é separado em servidor (pasta server) e aplicativo (pasta app).

Caso esteja no VSCode, é recomendado que sejam abertos dois terminais simultâneos em Split para melhor visualização dos dois sistemas funcionando.

* Para entrar nas pastas, coloque no terminal (já estando na pasta aplicacoes-corporativas): `cd server` ou `cd app`.

A seguir vou listar os comandos do terminal de cada pasta individualmente.



## /Server

Antes de iniciar o servidor, é necessário seguir os passos abaixo para instalar as dependências e configurar o banco de dados corretamente.

* Cópia do arquivo .env.example: no Windows é `copy .env.example .env` e no Linux é `cp .env.example .env`. Após copiar, é necessário alterar os dados conforme as próprias configurações e senhas.
* Instalação de dependências: `npm install`.
* Criação do banco de dados com Prisma usando migrações e seeding: `npx prisma migrate dev` e depois `npx prisma db seed`.
* Iniciar o server: `npm start` ou `npm run dev`.
* Criação da documentação do JSDoc (isso gera uma pasta "/docs" com arquivos HTML das funções): `npm run docs`.

Após a inicialização do servidor, para visualizar a documentação com Swagger acesse a rota "/api-docs". Isso também estará descrito no log padrão do servidor.

## Acesso

Por padrão, ao dar o `npm run dev` ou `npm start` é mostrado no terminal o link para o servidor.

## Testes

É possível testá-lo manualmente utilizando o aplicativo do projeto ou por softwares como Insomnia.
Para testes automáticos unitários e de integração, que utilizam Jest e Supertest, é preciso rodar o comando `npm test`.



## /App

Antes de iniciar o aplicativo, é necessário seguir os passos abaixo para instalar as dependências.

* Instalação de dependências: `npm install`.

## Caso queira ver a versão dev:

* Iniciar o app no modo desenvolvedor: `npm run dev`.

## Caso queira ver a versão que iria pra produção:

* Criar a build do app: `npm run build`.
* Iniciar a preview do app em produção: `npm run preview`.

## Acesso

Por padrão, ao dar o `npm run dev` ou `npm run preview` é mostrado no terminal o link para o aplicativo.

## Testes

Para testes automáticos de ponta a ponta (e2e), que utilizam Selenium, é preciso rodar manualmente os arquivos criados na pasta "/tests/e2e".

* Um exemplo seria `node tests/e2e/login.test.js`.
* IMPORTANTE: os testes com Selenium foram feitos para o navegador Mozilla Firefox.