const fs = require('fs');
const xml2js = require('xml2js'); // Para converter JSON em XML e vice-versa
const db = require('../database');

// Função para exportar tarefas em JSON
exports.exportTasksJSON = async (req, res) => {
    try {
        const userId = req.user.userId; // Pega o ID do usuário autenticado
        const [tasks] = await db.promise().query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
        const fileName = `tasks_${userId}_${Date.now()}.json`;

        // Cria a pasta 'exports' caso ela não exista
        if (!fs.existsSync('./exports')) fs.mkdirSync('./exports');

        fs.writeFileSync(`./exports/${fileName}`, JSON.stringify(tasks, null, 2));
        res.json({ message: 'Tarefas exportadas com sucesso!', file: fileName });
    } catch (error) {
        console.error('Erro ao exportar tarefas em JSON:', error);
        res.status(500).json({ error: 'Erro ao exportar tarefas.' });
    }
};

// Função para exportar tarefas em XML
exports.exportTasksXML = async (req, res) => {
    try {
        const userId = req.user.userId; // Pega o ID do usuário autenticado
        const [tasks] = await db.promise().query('SELECT * FROM tasks WHERE user_id = ?', [userId]);

        const builder = new xml2js.Builder();
        const xml = builder.buildObject({ tasks: tasks });

        const fileName = `tasks_${userId}_${Date.now()}.xml`;

        // Cria a pasta 'exports' caso ela não exista
        if (!fs.existsSync('./exports')) fs.mkdirSync('./exports');

        fs.writeFileSync(`./exports/${fileName}`, xml);
        res.json({ message: 'Tarefas exportadas com sucesso!', file: fileName });
    } catch (error) {
        console.error('Erro ao exportar tarefas em XML:', error);
        res.status(500).json({ error: 'Erro ao exportar tarefas.' });
    }
};

// Função para importar tarefas de um arquivo JSON
exports.importTasksJSON = async (req, res) => {
    try {
        const userId = req.user.userId; // ID do usuário autenticado
        const { file } = req.files; // Arquivo enviado

        if (!file) {
            return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
        }

        const tasks = JSON.parse(file.data.toString());
        for (const task of tasks) {
            await db.promise().query(
                'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)',
                [userId, task.title, task.description, task.status]
            );
        }

        res.json({ message: 'Tarefas importadas com sucesso!' });
    } catch (error) {
        console.error('Erro ao importar tarefas de JSON:', error);
        res.status(500).json({ error: 'Erro ao importar tarefas.' });
    }
};

// Função para importar tarefas de um arquivo XML
exports.importTasksXML = async (req, res) => {
    try {
        const userId = req.user.userId; // ID do usuário autenticado
        const { file } = req.files; // Arquivo enviado

        if (!file) {
            return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
        }

        const parser = new xml2js.Parser();
        const parsedData = await parser.parseStringPromise(file.data.toString());

        if (!parsedData.tasks || !Array.isArray(parsedData.tasks.task)) {
            return res.status(400).json({ error: 'Formato XML inválido.' });
        }

        for (const task of parsedData.tasks.task) {
            await db.promise().query(
                'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)',
                [userId, task.title[0], task.description[0], task.status[0]]
            );
        }

        res.json({ message: 'Tarefas importadas com sucesso!' });
    } catch (error) {
        console.error('Erro ao importar tarefas de XML:', error);
        res.status(500).json({ error: 'Erro ao importar tarefas.' });
    }
};
