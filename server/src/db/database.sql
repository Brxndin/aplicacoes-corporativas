CREATE DATABASE prova_p1;

USE prova_p1;

CREATE TABLE users(
    id auto_increment,
    nome varchar(200) NOT NULL,
    email varchar(200) NOT NULL,
    senha varchar(200) NOT NULL
);

-- seeder para usuário adm inicial
INSERT INTO users
(nome, email, senha)
VALUES ('Administrador', 'admin@ifrs.edu.br', '123456');

CREATE TABLE events(

);

CREATE TABLE volunteers(

);