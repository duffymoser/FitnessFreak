const express = require ('express');
const routinesRouter = express.Router();

//import routines methods
const {
    getPublicRoutines
} = require('../db');


//get routines - route /api/routines
//return public routines and their activities

routinesRouter.get('/', async (req, res) => {
    try {
      const allPublicRoutines = await getPublicRoutines();          
      res.send({
        allPublicRoutines
      });
    //not sure hwat to do with this catch
    } catch ({ name, message }) {
      next({ name, message });
    }
  });


  module.exports = routinesRouter;