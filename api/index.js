const express = require('express');
const apiRouter = express.Router();
const { client } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// set `req.user` if possible
//straight copy-pasta'ed from juicebox

apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    
    if (!auth) { // nothing to see here
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
  
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
  
        if (id) {
          req.user = await getUserById(id);
          next();
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });
  
  apiRouter.use((req, res, next) => {
    if (req.user) {
      console.log("User is set:", req.user);
    }
  
    next();
  });

async function getUserById(userId) {
    try {
      const { rows: [ user ] } = await client.query(`
        SELECT id, username
        FROM users
        WHERE id=${ userId }
      `);
  
      if (!user) {
        throw {
          name: "UserNotFoundError",
          message: "A user with that id does not exist"
        }
      }
  
      return user;
    } catch (error) {
      throw error;
    }
  }


const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const activitiesRouter = require('./activities');
apiRouter.use('/activities', activitiesRouter);

const routinesRouter = require('./routines');
apiRouter.use('/routines', routinesRouter);

//const routineactivitiesRouter = require('./routineactivities');
//apiRouter.use('/routineactivities', routineactivitiesRouter);



apiRouter.use((error, req, res, next) => {
    res.send(error);
});







module.exports = apiRouter;