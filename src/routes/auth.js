// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Usado para hash de senhas
const jwt = require('jsonwebtoken'); // Para gerar o token JWT
const User = require('../models/User'); // Ajuste do caminho do modelo de Usuário

const SECRET_KEY = process.env.SECRET_KEY || 'secretkey'; // Chave secreta para o JWT

// Função para registrar um novo usuário
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se todos os campos foram preenchidos
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        // Verifica se o usuário já existe
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        // Cria o hash da senha
        const passwordHash = await bcrypt.hash(password, 10);

        // Cria o usuário no banco de dados
        await User.create({ email, password: passwordHash });

        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Função para realizar login do usuário
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se todos os campos foram preenchidos
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        // Busca o usuário no banco
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        // Verifica a senha
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        // Gera o token JWT
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;
