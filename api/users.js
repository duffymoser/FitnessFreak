const express = require ('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');

//import user methods
const {
    createUser
} = require('../db');

usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    console.log("Test");
    try {
    
      const user = await createUser({
        username,
        password,
      });
  
      const token = jwt.sign({ 
        id: user.id, 
        username
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });
  
      res.send({ 
        message: "thank you for signing up",
        token
      });
    } catch ({ name, message }) {
      next({ name, message });
    } 
  });

  module.exports = usersRouter;