const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');
const exportImportRoutes = require('./src/routes/exportImport');
const fileUpload = require('express-fileupload'); // Importando express-fileupload

dotenv.config();

const app = express();

// Middleware para lidar com JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para lidar com dados de formulários, se necessário

// Middleware para upload de arquivos
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB por arquivo
  abortOnLimit: true, // Abortar upload se exceder o limite
  responseOnLimit: 'O arquivo enviado é muito grande.',
}));

// Rotas
app.use('/api/auth', authRoutes); // Rota de autenticação
app.use('/api/tasks', taskRoutes); // Rota de tarefas
app.use('/api/import-export', exportImportRoutes); // Rota de exportação/importação

// Inicia o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
