const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Certifique-se de que está apontando corretamente para o controlador
const ensureAuthenticated = require('../middlewares/ensureAuthenticated'); // Middleware de autenticação

// Lista todas as tarefas
router.get('/', ensureAuthenticated, taskController.getAllTasks); // Middleware de autenticação adicionado

// Cria uma nova tarefa
router.post('/', ensureAuthenticated, taskController.createTask); // Middleware de autenticação adicionado

// Atualiza uma tarefa
router.put('/:id', ensureAuthenticated, taskController.updateTask); // Middleware de autenticação adicionado

// Deleta uma tarefa
router.delete('/:id', ensureAuthenticated, taskController.deleteTask); // Middleware de autenticação adicionado

module.exports = router;
