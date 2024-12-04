const db = require('../database');

const User = {
  create: async (user) => {
    const { email, password, name, picture } = user;
    const query = 'INSERT INTO users (email, password, name, picture) VALUES (?, ?, ?, ?)';
    try {
      const [result] = await db.promise().query(query, [email, password, name, picture]);
      return result;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },

  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    try {
      const [results] = await db.promise().query(query, [email]);
      return results[0];
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      throw error;
    }
  },
};

module.exports = User;
