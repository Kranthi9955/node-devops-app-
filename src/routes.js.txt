const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', controller.home);
router.get('/health', controller.health);
router.post('/sum', controller.sum);

module.exports = router;