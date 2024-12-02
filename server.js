// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./src/routes/tasks');  // Importa as rotas de tarefas
const authRoutes = require('./src/routes/auth');    // Importa as rotas de autenticação

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());  // Para parsing de JSON no corpo das requisições
app.use(cors());            // Permite requisições de diferentes origens

// Rotas
app.use('/tasks', taskRoutes); // Define o middleware para as rotas de tarefas
app.use('/auth', authRoutes);  // Define o middleware para as rotas de autenticação

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
