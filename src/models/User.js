const db = require('../database');

const User = {
  findById: async (id) => {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  findByEmail: async (email) => {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  create: async (user) => {
    const { email, password, name, picture } = user;
    await db.promise().query('INSERT INTO users (email, password, name, picture) VALUES (?, ?, ?, ?)', [
      email, password, name, picture,
    ]);
  },

  getAll: async () => {
    const [rows] = await db.promise().query('SELECT id, email, name, picture, created_at FROM users');
    return rows;
  },

  update: async (id, data) => {
    const updates = [];
    const values = [];
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }

    values.push(id);
    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    await db.promise().query(query, values);
  },

  delete: async (id) => {
    await db.promise().query('DELETE FROM users WHERE id = ?', [id]);
  },
};

module.exports = User;
