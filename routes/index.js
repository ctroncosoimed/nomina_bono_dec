var express = require('express');
var router = express.Router();
const nominaController = require('../controllers').nomina;


router.post('/api/v1/nomina', nominaController.list);
router.put('/api/v1/nomina/:codigo', nominaController.update);



module.exports = router;