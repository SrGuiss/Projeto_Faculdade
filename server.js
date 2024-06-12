const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3000;
const { setUserId } = require('./public/js/sessionManager.js').default;
// Middleware para analisar o corpo da solicitação JSON
app.use(express.json());


app.use(session({
    secret: 'sua-chave-secreta-aqui',
    resave: false,
    saveUninitialized: false,
    userId: 0
}));

// Configuração do Sequelize
const sequelize = new Sequelize('PROJETO', 'root', 'asDJAFIsss!@1321', {
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
    },
    E_MAIL: {
        type: DataTypes.STRING,
        allowNull: false
    },
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

// Rotas para consultar os dados do banco de dados
app.get('/GetAllAluno', async (req, res) => {
    try {
        const alunos = await Aluno.findAll();
        res.json({ alunos });
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    }
});

app.get('/GetAllCurso', async (req, res) => {
    try {
        const cursos = await Curso.findAll();
        res.json({ cursos });
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    }
});

app.get('/aluno/:id', async (req, res) => {
    try {
        const alunoId = req.params.id;
        const aluno = await Aluno.findOne({
            where: { RA: alunoId },
            attributes: ['RA', 'NOME', 'E_MAIL'] // Adicione outros atributos conforme necessário
        });
        if (aluno) {
            console.log(aluno);
            res.json(aluno);
        } else {
            console.log(aluno);
            res.status(404).json({ error: 'Aluno não encontrado' });            
        }
    } catch (error) {
        console.error('Erro ao consultar o aluno:', error);
        res.status(500).json({ error: 'Erro ao consultar o aluno' });
    }
});

app.put('/aluno/:id', async (req, res) => {
    try {
        const alunoId = req.params.id;
        const { NOME, E_MAIL } = req.body;

        const aluno = await Aluno.findOne({ where: { RA: alunoId } });

        if (aluno) {
            aluno.NOME = NOME;
            aluno.E_MAIL = E_MAIL;
            await aluno.save();
            res.json(aluno);
        } else {
            res.status(404).json({ error: 'Aluno não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar o aluno:', error);
        res.status(500).json({ error: 'Erro ao atualizar o aluno' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { USUARIO, SENHA } = req.body;

        const login = await Login.findOne({ 
            attributes: ['RA'], 
            where: { USUARIO, SENHA } 
        });

        if (login) {
            setUserId(login.RA);
            res.json({ message: 'Login bem-sucedido', userId: login.RA });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});


app.use(express.static('public'));

// Roteamento básico para páginas HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'profile.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'cadastro.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});


// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
