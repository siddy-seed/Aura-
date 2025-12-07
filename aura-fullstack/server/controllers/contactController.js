const ContactMessage = require('../models/ContactMessage');

const submitContactMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            res.status(400);
            throw new Error('Please fill all fields');
        }

        const contact = await ContactMessage.create({
            name,
            email,
            message
        });

        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { submitContactMessage };
