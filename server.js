const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para analisar o corpo da solicitação JSON
app.use(express.json());

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

app.post('/', async (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
        return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
        res.json({ success: true, user: results[0] });
        } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
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
