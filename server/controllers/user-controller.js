const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Function to generate JWT token for a user
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};


exports.register = async (req, res, next) => {
    const { username, password, email } = req.body;
    try {
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 12);

        pool.query(
            'INSERT INTO users (username, password, email) VALUES (?, ?, ?)', 
            [username, hashedPassword, email], 
            (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'Failed to register user.' });
                }

                const userId = results.insertId;

                const token = generateToken(userId);

                res.status(201).json({
                    message: 'User registered successfully',
                    token: token
                });
            }
        );
    } catch (err) {
        console.error(err); 
        next(err); 
    }
};

// Login a user
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user[0].id);

        res.status(200).json({
            message: 'Login successful',
            token: token
        });
    } catch (err) {
        next(err);
    }
};
