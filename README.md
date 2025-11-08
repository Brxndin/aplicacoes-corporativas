# O que é

Servidor e Aplicativo para a listagem e manipulação de eventos e seus voluntários.

# Objetivo

Desenvolvido para a Prova P1 da cadeira de Desenvolvimento de Aplicações Corporativas.



# Inicialização e Uso

O projeto é separado em servidor (pasta server) e aplicativo (pasta app).

Caso esteja no VSCode, é recomendado que sejam abertos dois terminais simultâneos em Split para melhor visualização dos dois sistemas funcionando.

* Para entrar nas pastas, coloque no terminal (já estando na pasta aplicacoes-corporativas): `cd server` ou `cd app`.

A seguir vou listar os comandos do terminal de cada pasta individualmente.



## /Server

Antes de iniciar o servidor, é necessário ter o MySQL rodando e configurar o arquivo .env para que tenha as informações de acesso ao banco de dados. Também é necessário rodar os script SQL para que a database, tabelas e dados iniciais estejam disponíveis. Esses script estão disponíveis em "/server/src/db/database.sql".

* Cópia do arquivo .env.example: no Windows é `copy .env.example .env` e no Linux é `cp .env.example .env`. Após copiar, é necessário alterar os dados conforme as próprias configurações e senhas.
* Instalação de dependências: `npm install`.
* Iniciar o server: `npm start` ou `npm run dev`.
* Criação da documentação do JSDoc (isso gera uma pasta "/docs" com arquivos HTML das funções): `npm run docs`.

Para acessar a documentação com Swagger, após a inicialização do servdiro acesse a rota "/api-docs". Isso também estará descrito no log padrão do servidor.

## Acesso

Por padrão, ao dar o `npm run dev` ou `npm start` é mostrado no terminal o link para o servidor. É possível testá-lo utilizando o aplicativo do projeto ou por softwares como Insomnia.



## /App

* Instalação de dependências: `npm install`.

## Caso queira ver a versão dev:

* Iniciar o app no modo desenvolvedor: `npm run dev`.

## Caso queira ver a versão que iria pra produção:

* Criar a build do app: `npm run build`.
* Iniciar a preview do app em produção: `npm run preview`.

## Acesso

Por padrão, ao dar o `npm run dev` ou `npm run preview` é mostrado no terminal o link para o aplicativo.