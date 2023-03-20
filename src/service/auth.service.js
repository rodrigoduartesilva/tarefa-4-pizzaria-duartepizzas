const Usuario = require('../model/Usuario');
const jwt = require('jsonwebtoken');

const loginService = (email) => Usuario.findOne({ email: email }).select('senha');

const generateToken = (userId) => jwt.sign({ id: userId }, 'afgsujf659çcm130x2nzpq', { expiresIn: 86400 });

module.exports = {
    loginService,
    generateToken
}