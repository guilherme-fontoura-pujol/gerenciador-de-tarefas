const db = require('../database');

const Task = {
  create: async (task) => {
    const { userId, title, description, status } = task;
    const query = 'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)';
    return db.promise().query(query, [userId, title, description, status]);
  },

  findAllByUserId: async (userId) => {
    const query = 'SELECT * FROM tasks WHERE user_id = ?';
    const [results] = await db.promise().query(query, [userId]);
    return results;
  },

  update: async (taskId, updates) => {
    const { title, description, status } = updates;
    const query = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
    return db.promise().query(query, [title, description, status, taskId]);
  },

  delete: async (taskId) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    return db.promise().query(query, [taskId]);
  },
};

module.exports = Task;
