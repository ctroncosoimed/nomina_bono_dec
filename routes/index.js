var express = require('express');
var router = express.Router();
const nominaController = require('../controllers').nomina;


router.get('/api/v1/nomina', nominaController.list);
router.put('/api/v1/nomina/:codigo', nominaController.update);
router.post('/api/v1/nomina', nominaController.insert);


module.exports = router;