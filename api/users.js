const express = require ('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');

//import user methods
const {
    createUser,
    getUserByName
} = require('../db');


//create user - route /api/users/register
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

//user login - route /api/users/login

  usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
  
    // request must have both username and password
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    }
  
    try {
      const user = await getUserByName(username);
  
      if (user && user.password == password) {
        const token = jwt.sign({ 
          id: user.id, 
          username
        }, process.env.JWT_SECRET, {
          expiresIn: '1w'
        });

        longToken = user.id + " " + username + " " + token;
  
        res.send({ 
          message: "you're logged in!",
          longToken 
        });
      } else {
        next({ 
          name: 'IncorrectCredentialsError', 
          message: 'Username or password is incorrect'
        });
      }
    } catch(error) {
      console.log(error);
      next(error);
    }
  });

  module.exports = usersRouter;