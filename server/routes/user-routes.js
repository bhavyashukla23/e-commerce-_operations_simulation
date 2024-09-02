const express = require('express');
const { register, login } = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', authMiddleware,login);

module.exports = router;
