# O que é
Aplicação feita em React com ViteJS para listar eventos e seus voluntários, além de permitir usuários efetuarem login e visualizarem um dashboard.



# Objetivo
Criado para a Prova P1 e P2 da cadeira de Desenvolvimento de Aplicações Corporativas.



# Tecnologias Usadas

* React com ViteJS
* Axios
* Selenium



# Inicialização e Uso

O projeto é separado em servidor (pasta server) e aplicativo (pasta app).

* Para entrar na pasta do aplicativo, coloque no terminal (já estando na pasta aplicacoes-corporativas): `cd app`.

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