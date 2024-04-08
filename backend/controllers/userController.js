const User = require('../models/userModel');

async function register(req, res) {
    console.log(req.body);
    const { username, email, password } = req.body;
    console.log(username)
    const user = new User(username, email, password);
    try {
        const result = await user.register();
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    register: register
};