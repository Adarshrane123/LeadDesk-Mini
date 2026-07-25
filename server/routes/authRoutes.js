const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/authController');
const { validateLogin } = require('../validators/authValidator');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', validateLogin, login);
router.get('/me', protect, getMe);

module.exports = router;
