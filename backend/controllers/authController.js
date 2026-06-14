const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    try {
        const userExists = await User.findByEmail(email);
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userId = await User.create(username, email, hashedPassword);
        
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            userId
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};