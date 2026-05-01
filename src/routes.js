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
const API_PREFIX = '/api/v1';

/**
 * Routes
 */
router.get('/', controller.home);

router.get(`${API_PREFIX}/health`, controller.health);

router.post(`${API_PREFIX}/sum`, controller.sum);

module.exports = router;
