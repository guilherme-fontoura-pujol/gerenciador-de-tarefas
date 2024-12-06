const db = require('../database');

const Task = {
  create: async (task) => {
    const { userId, title, description, priority, status } = task;
    const query = 'INSERT INTO tarefas (user_id, title, description, priority, status) VALUES (?, ?, ?, ?, ?)';
    return db.promise().query(query, [userId, title, description, priority, status]);
  },

  findAllByUserId: async (userId) => {
    const query = 'SELECT * FROM tarefas WHERE user_id = ?';
    const [results] = await db.promise().query(query, [userId]);
    return results;
  },

  update: async (taskId, updates) => {
    const { title, description, priority, status } = updates;
    const query = 'UPDATE tarefas SET title = ?, description = ?, priority = ?, status = ? WHERE id = ?';
    return db.promise().query(query, [title, description, priority, status, taskId]);
  },

  delete: async (taskId) => {
    const query = 'DELETE FROM tarefas WHERE id = ?';
    return db.promise().query(query, [taskId]);
  },
};

module.exports = Task;
