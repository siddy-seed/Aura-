const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        qty: { type: Number, required: true, default: 1 },
        selectedSize: { type: String } // e.g. "75g"
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);
