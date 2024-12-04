const db = require('../database');

// Função para listar todas as tarefas
exports.getAllTasks = async (req, res) => {
  const userId = req.user.userId;

  try {
    const [tasks] = await db.promise().query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar tarefas' });
  }
};

// Função para criar uma nova tarefa
exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.user.userId;

  try {
    const [result] = await db.promise().query(
      'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)',
      [userId, title, description, status]
    );
    res.status(201).json({ message: 'Tarefa criada com sucesso', taskId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

// Função para atualizar uma tarefa
exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  const taskId = req.params.id;

  try {
    await db.promise().query(
      'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
      [title, description, status, taskId]
    );
    res.json({ message: 'Tarefa atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

// Função para excluir uma tarefa
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    await db.promise().query('DELETE FROM tasks WHERE id = ?', [taskId]);
    res.json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
};
