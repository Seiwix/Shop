const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function register(req, res) {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        
        const emailExists = await User.isEmailExists(email);
        if (emailExists) {
            return res.status(400).json({
                error: 'Benutzer mit dieser email existiert bereits'
            });
        }
        const user = new User(username, email, password);

        const registrationResult = await user.register();
        const token = registrationResult.token;

        res.status(201).json({
            message: 'Benutzer wurde erfolgreich registriert',
            token
        });
    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
}

async function login(req, res) {
    try {
        const {
            email,
            password
        } = req.body;
        const loginUser = new User(null, email, password);
        const result = await loginUser.login();
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({
            error: error.message
        });
    }
}



module.exports = {
    register: register,
    login: login
};