// middlewares/checkTaskOwnership.js
const db = require('../database');

module.exports = (req, res, next) => {
    const taskId = req.params.id; // ID da tarefa a ser verificada
    const userId = req.user.id; // ID do usuário autenticado

    // Verifica se a tarefa pertence ao usuário
    db.query('SELECT * FROM tarefas WHERE id = ? AND user_id = ?', [taskId, userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(403).json({ message: 'Tarefa não encontrada ou não autorizada' });
        }

        next(); // Se a tarefa pertence ao usuário, segue para a próxima função
    });
};
