const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const pageSize = 12;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const category = req.query.category
            ? {
                category: {
                    $regex: req.query.category,
                    $options: 'i',
                },
            }
            : {};

        const count = await Product.countDocuments({ ...keyword, ...category });
        const products = await Product.find({ ...keyword, ...category })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ createdAt: -1 });

        res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const cloudinary = require('../config/cloudinary.config');
        let cloudinaryUrls = [];

        // Upload images to Cloudinary if files are provided
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                try {
                    // Upload to Cloudinary
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: 'aura/products',
                        resource_type: 'auto',
                    });
                    cloudinaryUrls.push(result.secure_url);
                } catch (uploadError) {
                    console.error('Cloudinary upload error:', uploadError);
                    return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
                }
            }
        }

        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            user: req.user._id,
            images: cloudinaryUrls,
            category: req.body.category,
            countInStock: req.body.countInStock || 0,
            stock: req.body.stock,
            description: req.body.description,
            ingredients: req.body.ingredients ? req.body.ingredients.split(',').map(i => i.trim()) : [],
            sizes: req.body.sizes ? req.body.sizes.split(',').map(s => s.trim()) : []
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            images,
            category,
            stock,
            ingredients,
            sizes
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.images = images || product.images;
            product.category = category || product.category;
            product.stock = stock || product.stock;
            product.ingredients = ingredients || product.ingredients;
            product.sizes = sizes || product.sizes;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
