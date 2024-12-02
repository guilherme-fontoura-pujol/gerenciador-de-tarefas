// routes/tasks.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Controlador de tarefas
const ensureAuthenticated = require('../middlewares/ensureAuthenticated'); // Middleware de autenticação

// Lista todas as tarefas
router.get('/', taskController.getAllTasks);

// Cria uma nova tarefa
router.post('/', taskController.createTask);

// Atualiza uma tarefa
router.put('/:id', taskController.updateTask);

// Deleta uma tarefa
router.delete('/:id', taskController.deleteTask);

module.exports = router;
