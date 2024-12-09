const express = require('express');
const authController = require('../controllers/authController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/users', authController.listUsers);

router.put('/users/:id', ensureAuthenticated, authController.updateUser);

router.delete('/users/:id', ensureAuthenticated, authController.deleteUser);

module.exports = router;

