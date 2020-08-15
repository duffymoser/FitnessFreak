const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
// const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;




const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

//const activitiesRouter = require('./activities');
//apiRouter.use('/activities', activitiesRouter);

//const routinesRouter = require('./routines');
//apiRouter.use('/routines', routinesRouter);

//const routineactivitiesRouter = require('./routineactivities');
//apiRouter.use('/routineactivities', routineactivitiesRouter);



apiRouter.use((error, req, res, next) => {
    res.send(error);
});







module.exports = apiRouter;