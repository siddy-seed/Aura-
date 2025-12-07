const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // soap, bodycare, skincare
    price: { type: Number, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String }],
    stock: { type: Number, required: true, default: 0 },
    images: [{ type: String }], // Array of URL strings
    sizes: [{ type: String }], // e.g. "75g", "150g"
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
