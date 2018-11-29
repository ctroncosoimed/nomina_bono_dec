var express = require('express');
var router = express.Router();
const nominaController = require('../controllers').nomina;


router.get('/bono_dec/nomina', nominaController.list);
router.put('/bono_dec/nomina/:codigo', nominaController.update);
router.post('/bono_dec/nomina', nominaController.insert);


module.exports = router;