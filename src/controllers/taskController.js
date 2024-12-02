// controllers/taskController.js
const db = require('../database'); // Conexão com o banco de dados

// Função para listar todas as tarefas
exports.getAllTasks = async (req, res) => {
    const userId = req.user.userId; // Pega o ID do usuário do token JWT

    try {
        const tasks = await db.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
        res.json(tasks);
    } catch (error) {
        console.error('Erro ao listar tarefas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Função para criar uma nova tarefa
exports.createTask = async (req, res) => {
    const { title, description, status } = req.body;
    const userId = req.user.userId; // Pega o ID do usuário do token JWT

    try {
        const result = await db.query(
            'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)',
            [userId, title, description, status]
        );
        res.status(201).json({ message: 'Tarefa criada com sucesso', taskId: result.insertId });
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Função para atualizar uma tarefa
exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    const taskId = req.params.id;

    try {
        await db.query(
            'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
            [title, description, status, taskId]
        );
        res.json({ message: 'Tarefa atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Função para excluir uma tarefa
exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
        res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
