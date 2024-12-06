const express = require('express');
const authController = require('../controllers/authController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const router = express.Router();

// Rota de registro
router.post('/register', authController.register);

// Rota de login
router.post('/login', authController.login);

// Rota para listar usuários
router.get('/users', authController.listUsers);

// Rota para atualizar usuário
router.put('/users/:id', ensureAuthenticated, authController.updateUser);

// Rota para deletar usuário
router.delete('/users/:id', ensureAuthenticated, authController.deleteUser);

module.exports = router;

