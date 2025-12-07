const Cart = require('../models/Cart');

const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
        if (!cart) {
            cart = await Cart.create({ userId: req.user._id, items: [] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, qty, selectedSize } = req.body;
        let cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) {
            cart = await Cart.create({ userId: req.user._id, items: [] });
        }

        const itemIndex = cart.items.findIndex(p => p.productId == productId && p.selectedSize == selectedSize);

        if (itemIndex > -1) {
            cart.items[itemIndex].qty += qty;
        } else {
            cart.items.push({ productId, qty, selectedSize });
        }

        await cart.save();
        const fullCart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
        res.status(201).json(fullCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { itemId, qty } = req.body;
        const cart = await Cart.findOne({ userId: req.user._id });

        if (cart) {
            const item = cart.items.id(itemId);
            if (item) {
                item.qty = qty;
                await cart.save();
                const fullCart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
                res.json(fullCart);
            } else {
                res.status(404);
                throw new Error('Item not found in cart');
            }
        } else {
            res.status(404);
            throw new Error('Cart not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id });
        if (cart) {
            cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
            await cart.save();
            const fullCart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
            res.json(fullCart);
        } else {
            res.status(404);
            throw new Error('Cart not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
};
