const db = require('../database');

// Função para listar todas as tarefas
exports.getAllTasks = async (req, res) => {
  const userId = req.user.userId;

  try {
    const [tarefas] = await db.promise().query('SELECT * FROM tarefas WHERE user_id = ?', [userId]);
    res.json(tarefas);
  } catch (error) {
    console.error("Erro ao listar tarefas:", error); // Log do erro
    res.status(500).json({ error: 'Erro ao listar tarefas' });
  }
};

// Função para criar uma nova tarefa
exports.createTask = async (req, res) => {
  const { title, description, prioridade } = req.body;
  const userId = req.user.userId;

  if (!title) {
    return res.status(400).json({ error: "O campo 'title' é obrigatório." });
  }

  try {
    const [result] = await db.promise().query(
      'INSERT INTO tarefas (user_id, title, description, prioridade, status, created_at) VALUES (?, ?, ?, ?, "pendente", NOW())',
      [userId, title, description || null, prioridade || 'media']
    );
    res.status(201).json({ message: 'Tarefa criada com sucesso', taskId: result.insertId });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error); // Log do erro
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

// Função para atualizar uma tarefa
exports.updateTask = async (req, res) => {
  const { title, description, prioridade, status } = req.body;
  const taskId = req.params.id;

  try {
    const [result] = await db.promise().query(
      'UPDATE tarefas SET title = ?, description = ?, prioridade = ?, status = ? WHERE id = ?',
      [title, description, prioridade, status, taskId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json({ message: 'Tarefa atualizada com sucesso' });
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error); // Log do erro
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

// Função para excluir uma tarefa
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const [result] = await db.promise().query('DELETE FROM tarefas WHERE id = ?', [taskId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error); // Log do erro
    res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
};
