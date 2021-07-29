const { Router } = require('express');

const authController = require('../controllers/auth.controller');

const router = Router();

router.post('/login', authController.login);
router.post('/refresh', authController.refresh);

module.exports = router;
