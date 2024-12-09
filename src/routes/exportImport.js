const express = require('express');
const exportImportController = require('../controllers/exportImportController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const router = express.Router();

router.get('/export/json', ensureAuthenticated, exportImportController.exportTasksJSON);

router.get('/export/xml', ensureAuthenticated, exportImportController.exportTasksXML);

router.post('/import/json', ensureAuthenticated, exportImportController.importTasksJSON);

router.post('/import/xml', ensureAuthenticated, exportImportController.importTasksXML);

module.exports = router;
