const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./src/routes/tasks');
const authRoutes = require('./src/routes/auth');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
