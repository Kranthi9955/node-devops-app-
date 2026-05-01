const express = require('express');
const controller = require('./controller');

const router = express.Router();

/**
 * Middleware for request logging
 */
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

/**
 * API Versioning
 */

/**
 * Routes
 */
router.get('/', controller.home);
router.get('/health', controller.health);
router.post('/sum', controller.sum);


module.exports = router;
