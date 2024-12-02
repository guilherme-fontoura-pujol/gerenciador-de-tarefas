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

// Cria a tabela de tarefas caso não exista
db.query(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status ENUM('pendente', 'concluido') DEFAULT 'pendente',
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela de tarefas:', err);
    } else {
        console.log('Tabela de tarefas criada/verificada com sucesso!');
    }
});

// Cria a tabela de usuários caso não exista
db.query(`
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        googleId VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        picture VARCHAR(255)
    )
`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela de usuários:', err);
    } else {
        console.log('Tabela de usuários criada/verificada com sucesso!');
    }
});

module.exports = db;
