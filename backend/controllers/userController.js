const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

secretKey = "123";

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err.message);
    }
};

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        return res.status(409).json({ message: 'Username already exists' });
    }

    async function hashPassword(password) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    try {
        const user = new User({
            name,
            email,
            password: await hashPassword(password)
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

        const expirationTime = new Date(Date.now() + 3600000);

        res.cookie('token', token, { httpOnly: true, expires: expirationTime });

        user.save();
        res.status(201).json({ message: 'Registration successful', user });
    } catch (err) {
        res.status(400).json(err.message);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(409).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    try {
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

        const expirationTime = new Date(Date.now() + 3600000);

        res.cookie('token', token, { httpOnly: true, expires: expirationTime });
        res.status(201).json({ message: 'Login successful' });
    } catch (err) {
        res.status(400).json(err.message);
    }
};

const logout = async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
};

module.exports = {
    getUsers,
    register,
    login,
    logout
}