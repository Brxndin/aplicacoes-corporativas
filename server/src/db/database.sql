CREATE DATABASE prova_p1;

USE prova_p1;

CREATE TABLE usuarios(
    id int auto_increment,
    nome varchar(200) NOT NULL,
    email varchar(200) NOT NULL,
    senha varchar(200) NOT NULL
);

-- seeder para usuário adm inicial
INSERT INTO usuarios
(nome, email, senha)
VALUES ('Administrador', 'admin@ifrs.edu.br', '123456');

CREATE TABLE eventos(
    id int auto_increment,
    nome varchar(200) NOT NULL,
    descricao varchar(200) NOT NULL,
    data_hora_inicio datetime NOT NULL,
    data_hora_fim datetime NOT NULL,

    PRIMARY KEY id
);

CREATE TABLE voluntarios(
    id int auto_increment,
    cpf char(11) NOT NULL,
    nome varchar(200) NOT NULL,
    email varchar(200) NOT NULL,
    telefone varchar(200) NOT NULL,

    PRIMARY KEY id
);

CREATE TABLE voluntario_eventos(
    id int auto_increment,
    evento_id bigint NOT NULL,
    voluntario_id bigint NOT NULL,

    FOREIGN KEY evento_id REFERENCES eventos(id),
    FOREIGN KEY voluntario_id REFERENCES voluntarios(id)
);