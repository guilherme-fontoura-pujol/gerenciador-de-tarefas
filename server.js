const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Rota: Listar tarefas
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Rota: Adicionar tarefa
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    db.query(
        `INSERT INTO tasks (title, description) VALUES (?, ?)`,
        [title, description],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ id: results.insertId });
            }
        }
    );
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
