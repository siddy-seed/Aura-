const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    address: { type: String },
}, {
    timestamps: true
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// Hook to hash password before saving not strictly required if we hash in controller, 
// but good practice. However, user asked for "Hash passwords with bcrypt" in auth controller 
// specifically: "POST /api/auth/signup — create user (hash password with bcrypt)".
// I will keep it simple and hash in controller to be explicit, or method here. 
// I'll stick to controller hashing to follow "manual" instruction style usually preferred unless specified.
// Actually, I'll add a pre-save hook for convenience but handle it carefully.
// The user said: "Signup, Login pages with validation. Password hashing on backend".
// I'll leave the hashing logic to the controller for clarity.

module.exports = mongoose.model('User', userSchema);
