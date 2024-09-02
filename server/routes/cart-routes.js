const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cart-controllers');
const router = express.Router();

router.get('/:userId', getCart);
router.post('/', addToCart);
router.delete('/', removeFromCart);

module.exports = router;
