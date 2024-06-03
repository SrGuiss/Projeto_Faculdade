/*CREATE DATABASE PROJETO;
USE PROJETO;*/

CREATE TABLE ALUNO(
RA 	INT(4) PRIMARY KEY auto_increment,
NOME VARCHAR(50) NOT NULL,
E_MAIL VARCHAR(50) NOT NULL
);

CREATE TABLE CURSOS(
ID_CURSO INT(2) PRIMARY KEY auto_increment,
CURSO VARCHAR(30) NOT NULL,
DURACAO INT(3) NOT NULL,
DESCRICAO VARCHAR(80),
IMG VARCHAR(100)
);

CREATE TABLE LOGIN(
SENHA VARCHAR(30) NOT NULL,
USUARIO VARCHAR(30) NOT NULL,
RA INT(4) NOT NULL,
FOREIGN KEY (RA) REFERENCES ALUNO(RA)
);

CREATE TABLE CURSO_ALUNO(
ID_CURSO INT(2),
RA 	INT(4),
FOREIGN KEY (ID_CURSO) REFERENCES CURSOS(ID_CURSO),
FOREIGN KEY (RA) REFERENCES ALUNO(RA)
);

INSERT INTO ALUNO(NOME,E_MAIL) VALUES('Victor','Victor@hotmail.com');
INSERT INTO ALUNO(NOME,E_MAIL) VALUES('Guilherme','Guilherme@hotmail.com');
INSERT INTO ALUNO(NOME,E_MAIL) VALUES('Rubem','Rubem@hotmail.com');
INSERT INTO ALUNO(NOME,E_MAIL) VALUES('Leonarndo','Leonarndo@hotmail.com');