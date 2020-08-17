

const express = require ('express');
const activitiesRouter = express.Router();
const jwt = require('jsonwebtoken');
const { requireUser } = require('./utilities');

//import user methods
const {
    getAllActivities, createActivity
} = require('../db');


//get all activities

//route - /api/activities

activitiesRouter.get('/', async (req, res) => {
    try {
      const allActivities = await getAllActivities();          
      res.send({
        allActivities
      });
    //not sure hwat to do with this catch
    } catch ({ name, message }) {
      next({ name, message });
    }
  });


//create an activity
//route - /api/activities

activitiesRouter.post('/', requireUser, async (req, res, next) => {
    const { name, description } = req.body;
    const activityData = {};
    
    try{
        activityData.name = name;
        activityData.description = description;

        const newActivity = await createActivity(activityData);
        if (newActivity){
            res.send(newActivity);
        } else {
            next ({
                name: 'createActivityError',
                message: 'Your activity was not created'
            })
        } } catch ({ name, message}){
            next ({name, message});
        }
    
});
  



module.exports = activitiesRouter;