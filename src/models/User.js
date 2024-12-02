// models/User.js
const db = require('../database'); // Conexão com o banco de dados

// Função para criar um novo usuário
exports.createUser = async (email, passwordHash) => {
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [email, passwordHash], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Função para encontrar um usuário pelo email
exports.getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]); // Retorna o primeiro usuário encontrado
        });
    });
};
