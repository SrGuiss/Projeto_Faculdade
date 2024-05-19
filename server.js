const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

// Middleware para analisar o corpo da solicitação JSON
app.use(express.json());

// Configuração do Sequelize
const sequelize = new Sequelize('DATABASE', 'USER', 'PASS', {
    host: 'localhost',
    dialect: 'mysql'
});

// Definição dos modelos
const Aluno = sequelize.define('Aluno', {
    RA: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    NOME: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'ALUNO',
    timestamps: false
});

const Curso = sequelize.define('Curso', {
    ID_CURSO: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    CURSO: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DURACAO: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    DESCRICAO: {
        type: DataTypes.STRING,
        allowNull: true
    },
    IMG: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'CURSOS',
    timestamps: false
});

const Login = sequelize.define('Login', {
    SENHA: {
        type: DataTypes.STRING,
        allowNull: false
    },
    USUARIO: {
        type: DataTypes.STRING,
        allowNull: false
    },
    RA: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Aluno,
            key: 'RA'
        }
    }
}, {
    tableName: 'LOGIN',
    timestamps: false
});

const CursoAluno = sequelize.define('CursoAluno', {
    ID_CURSO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Curso,
            key: 'ID_CURSO'
        }
    },
    RA: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Aluno,
            key: 'RA'
        }
    }
}, {
    tableName: 'CURSO_ALUNO',
    timestamps: false
});

// Rota para consultar os dados do banco de dados
app.get('/GetAllAluno', async (req, res) => {
    try {
        // Consultar todos os dados
        const alunos = await Aluno.findAll();
        /*const cursos = await Curso.findAll();
        const logins = await Login.findAll();
        const cursoAlunos = await CursoAluno.findAll();*/

        // Enviar os dados como resposta
        res.json({
            alunos/*,
            cursos,
            logins,
            cursoAlunos*/
        });
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    }
});

app.get('/GetAllCurso', async (req, res) => {
    try {
        // Consultar todos os dados        
        const cursos = await Curso.findAll();

        // Enviar os dados como resposta
        res.json({
            cursos
        });
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    }
});

app.get('/aluno/:id', async (req, res) => {
    try {
        const alunoId = req.params.id;
        const aluno = await Aluno.findOne({ where: { RA: alunoId } });

        if (aluno) {
            res.json(aluno);
        } else {
            res.status(404).json({ error: 'Aluno não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao consultar o aluno:', error);
        res.status(500).json({ error: 'Erro ao consultar o aluno' });
    }
});

// Rota para inserir um novo aluno
app.post('/aluno', async (req, res) => {
    try {
        const { NOME } = req.body;
        if (!NOME) {
            return res.status(400).json({ error: 'Nome do aluno é obrigatório' });
        }

        const novoAluno = await Aluno.create({ NOME });
        res.status(201).json(novoAluno);
    } catch (error) {
        console.error('Erro ao inserir o aluno:', error);
        res.status(500).json({ error: 'Erro ao inserir o aluno' });
    }
});

// Servir arquivos estáticos (HTML e JS)
app.use(express.static('public'));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
