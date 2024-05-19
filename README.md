<h1>Como rodar o projeto:</h1>
<p>1 - Instale o node.js https://nodejs.org/en/download/package-manager</p>
<p>2 - Rode o comando no terminal: node server.js</p>
<h3>Banco</h3>
<p>Dentro da pasta "public" existe um arquivo "modelo do banco.sql", basta aplicar o mesmo no mysql.</p>
<p>Dentro do arquivo "server.js", temos a string de conexão com o banco de dados, a mesma deve ser alterada para a sua conexão local:</p>

```
// Configuração do Sequelize
const sequelize = new Sequelize('DATABASE', 'USER', 'PASS', {
    host: 'localhost',
    dialect: 'mysql'
});
```
<h3>Docker</h3>
<p>Tarefa em desenvolvimento.</p>
