const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost', // Endereço do servidor (geralmente localhost)
    user: 'root', // Substitua pelo seu usuário do MySQL
    password: '', // Substitua pela sua senha
    database: 'tarefas' // Substitua pelo nome do banco que você criou no phpMyAdmin
});

// Testa a conexão
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    } else {
        console.log('Conexão bem-sucedida ao banco de dados MySQL!');
    }
});

// Cria a tabela caso não exista
db.query(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status ENUM('pendente', 'concluido') DEFAULT 'pendente'
    )
`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela:', err);
    } else {
        console.log('Tabela criada/verificada com sucesso!');
    }
});

module.exports = db;
