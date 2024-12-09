const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');
const exportImportRoutes = require('./src/routes/exportImport');
const fileUpload = require('express-fileupload');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: 'O arquivo enviado é muito grande.',
  })
);

console.log('Carregando rotas de autenticação...');
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/import-export', exportImportRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
