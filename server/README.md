# O que é
Servidor arquitetado em formato de monolito que permite o cadastro e visualização de eventos e seus voluntários, além de ter funcionalidades de login e visualização de um dashboard.



# Objetivo
Criado para a Prova P1 e P2 da cadeira de Desenvolvimento de Aplicações Corporativas.



# Tecnologias Usadas

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

Para entrar na pasta do servidor, coloque no terminal (já estando na pasta aplicacoes-corporativas): `cd server`

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