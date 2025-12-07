const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeCartItem } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getCart)
    .post(protect, addToCart)
    .put(protect, updateCartItem);

router.route('/:itemId')
    .delete(protect, removeCartItem);

module.exports = router;
