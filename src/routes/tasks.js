const express = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const taskController = require('../controllers/taskController');
const router = express.Router();

// Rotas para tarefas
router.get('/', ensureAuthenticated, taskController.getAllTasks);
router.post('/', ensureAuthenticated, taskController.createTask);
router.put('/:id', ensureAuthenticated, taskController.updateTask);
router.delete('/:id', ensureAuthenticated, taskController.deleteTask);

module.exports = router;
