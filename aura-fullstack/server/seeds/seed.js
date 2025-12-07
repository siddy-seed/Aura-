const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const connectDB = require('../config/db');

dotenv.config(); // defaults to .env in cwd

const seedData = async () => {
    try {
        await connectDB();

        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Create Users
        const salt = await bcrypt.genSalt(10);
        const adminHash = await bcrypt.hash('admin123', salt);
        const userHash = await bcrypt.hash('user123', salt);

        const users = await User.insertMany([
            {
                name: 'Admin User',
                email: 'admin@aura.com',
                passwordHash: adminHash,
                role: 'admin',
                address: '123 Admin Lane, Luxury City, 90210'
            },
            {
                name: 'John Doe',
                email: 'john@example.com',
                passwordHash: userHash,
                role: 'user',
                address: '456 User St, Normal Town, 12345'
            }
        ]);

        const adminUser = users[0]._id;

        // Create Products
        const products = [
            {
                name: 'Charcoal Bar',
                category: 'soap',
                price: 100,
                description: 'Activated charcoal soap to draw out impurities and deep cleanse pores.',
                ingredients: ['Activated Charcoal', 'Tea Tree Oil', 'Coconut Oil'],
                stock: 50,
                images: ['/products/product-1.jpg'],
                sizes: ['150g']
            },
            {
                name: 'Mickey Mouse Soap',
                category: 'soap',
                price: 80,
                description: 'Fun Mickey Mouse shaped soap for kids. Gentle and mild.',
                ingredients: ['Glycerin', 'Milk', 'Mild Fragrance'],
                stock: 30,
                images: ['/products/product-2.jpg'],
                sizes: ['75g']
            },
            {
                name: 'Halloween Pumpkin',
                category: 'soap',
                price: 100,
                description: 'Spooky pumpkin shaped soap, perfect for Halloween festive vibes.',
                ingredients: ['Pumpkin Extract', 'Cinnamon Oil', 'Soap Base'],
                stock: 40,
                images: ['/products/product-3.jpg'],
                sizes: ['100g']
            },
            {
                name: 'Glycerine Honey Grape',
                category: 'skincare',
                price: 250,
                description: 'Luxurious glycerine soap with honey and grape extracts for hydrated skin.',
                ingredients: ['Glycerin', 'Honey', 'Grape Extract'],
                stock: 25,
                images: ['/products/product-4.jpg'],
                sizes: ['150g']
            },
            {
                name: 'Goat Soap Grapes',
                category: 'skincare',
                price: 300,
                description: 'Rich goat milk soap enriched with grape antioxidants.',
                ingredients: ['Goat Milk', 'Grape Seed Oil', 'Vitamin E'],
                stock: 60,
                images: ['/products/product-5.jpg'],
                sizes: ['150g']
            },
            {
                name: 'Rose Soap cakes',
                category: 'soap',
                price: 100,
                description: 'Rose scented soap cakes with a classic floral fragrance.',
                ingredients: ['Rose Water', 'Shea Butter', 'Essential Oils'],
                stock: 20,
                images: ['/products/product-6.jpg'],
                sizes: ['50g']
            },
            {
                name: 'Milk Base Rose Soap',
                category: 'soap',
                price: 100,
                description: 'Creamy milk-based soap with essence of rose.',
                ingredients: ['Milk Protein', 'Rose Oil', 'Cocoa Butter'],
                stock: 45,
                images: ['/products/product-7.png'],
                sizes: ['120g']
            },
            {
                name: 'Watermelon Soap',
                category: 'soap',
                price: 150,
                description: 'Fresh watermelon slice soap. Looks and smells like summer.',
                ingredients: ['Watermelon Extract', 'Cucumber', 'Poppy Seeds'],
                stock: 50,
                images: ['/products/product-8.jpg'],
                sizes: ['150g']
            }
        ];

        // Add user to products (admin)
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
