# O que é
Servidor arquitetado em formato de monolito que permite o cadastro e visualização de eventos e seus voluntários, além de ter funcionalidades de login e visualização de um dashboard.



# Objetivo
Criado para a Prova P1 da cadeira de Desenvolvimento de Aplicações Corporativas.



# Inicialização e Uso

O projeto é separado em servidor (pasta server) e aplicativo (pasta app).

Para entrar na pasta do servidor, coloque no terminal (já estando na pasta aplicacoes-corporativas): `cd server`

Antes de iniciar o servidor, é necessário ter o MySQL rodando e configurar o arquivo .env para que tenha as informações de acesso ao banco de dados. Também é necessário rodar os script SQL para que a database, tabelas e dados iniciais estejam disponíveis. Esses script estão disponíveis em "/server/src/db/database.sql".

* Cópia do arquivo .env.example: no Windows é `copy .env.example .env` e no Linux é `cp .env.example .env`. Após copiar, é necessário alterar os dados conforme as próprias configurações e senhas.
* Instalação de dependências: `npm install`.
* Iniciar o server: `npm start` ou `npm run dev`.
* Criação da documentação do JSDoc (isso gera uma pasta "/docs" com arquivos HTML das funções): `npm run docs`.

Para acessar a documentação com Swagger, após a inicialização do servdiro acesse a rota "/api-docs". Isso também estará descrito no log padrão do servidor.

## Acesso

Por padrão, ao dar o `npm run dev` ou `npm start` é mostrado no terminal o link para o servidor. É possível testá-lo utilizando o aplicativo do projeto ou por softwares como Insomnia.