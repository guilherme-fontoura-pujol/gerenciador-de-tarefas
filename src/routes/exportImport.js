const express = require('express');
const exportImportController = require('../controllers/exportImportController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const router = express.Router();

// Rota para exportar tarefas em JSON
router.get('/export/json', ensureAuthenticated, exportImportController.exportTasksJSON);

// Rota para exportar tarefas em XML
router.get('/export/xml', ensureAuthenticated, exportImportController.exportTasksXML);

// Rota para importar tarefas de um arquivo JSON
router.post('/import/json', ensureAuthenticated, exportImportController.importTasksJSON);

// Rota para importar tarefas de um arquivo XML
router.post('/import/xml', ensureAuthenticated, exportImportController.importTasksXML);

module.exports = router;
