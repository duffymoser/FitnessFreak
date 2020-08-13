const express = require('express');
const apirouter = express.Router();

const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;







module.exports = apirouter;