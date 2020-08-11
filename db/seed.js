//db/seed.js
//This should import the client from client.js, connect, and drop & rebuild the tables.
//It should then import any necessary functions from index.js to add a few users, a handful of activities, and build a few populated routines from them.
//Lastly it should close out the connection so it doesn't stall.

const { createUser} = require('./users');
const { client } = require('./client');
const { createActivity } = require('./activities');
const { createRoutine } = require('./routines');
const { addActivityToRoutine } = require('./routineactivities')
client.connect();

// const { bluebird }= require('./index');


async function dropTables(){
    try {
        console.log ("Dropping tables ....");
        await client.query(`
            DROP TABLE IF EXISTS routineactivities;
            DROP TABLE IF EXISTS routines;
            DROP TABLE IF EXISTS activities;
            DROP TABLE IF EXISTS users;        
        `);
        console.log ("Completed dropping tables ...")
        } catch (error){
            console.error("Error dropping tables!");
            console.error(error);
            throw error;
        }
}
async function createTables(){
    try {
      console.log("Starting to build tables...");
  
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL
        );
  
        CREATE TABLE activities (
          id SERIAL PRIMARY KEY,
          name varchar(255) UNIQUE NOT NULL,
          description TEXT NOT NULL
        );
  
        CREATE TABLE routines (
          id SERIAL PRIMARY KEY,
          "creatorId" INTEGER REFERENCES users(id),
          public BOOLEAN DEFAULT FALSE,
          name varchar(255) UNIQUE NOT NULL,
          goal TEXT NOT NULL
        );
  
        CREATE TABLE routineactivities (
          id SERIAL PRIMARY KEY,
          "routineId" INTEGER REFERENCES routines(id),
          "activityId" INTEGER REFERENCES activities(id),
          duration INTEGER,
          count INTEGER,
          UNIQUE ("routineId", "activityId")
        );
      `);
  
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
}
  async function createInitialUsers() {
    try {
      console.log("Starting to create users...");
  
      await createUser({ 
        username: 'user1', 
        password: 'password1'
      });
      await createUser({ 
        username: 'user2', 
        password: 'password2'
      });
      await createUser({ 
        username: 'user3', 
        password: 'password3'
      });
      await createUser({ 
        username: 'user4', 
        password: 'password4'
      });
      await createUser({ 
        username: 'user5', 
        password: 'password5'
      });
  
      console.log("Finished creating users!");
    } catch (error) {
      console.error("Error creating users!");
      throw error;
    }
}
  async function createInitialActivities() {
    try {
      console.log("Starting to create activities...");
  
      await createActivity({ 
        name: 'Limbo', 
        description : 'This how we put the lime in the coconut'
      });
      await createActivity({ 
        name: 'Brain Weave', 
        description : 'Follow the bouncing ball'
      });
      await createActivity({ 
        name: 'Psychic Restraint', 
        description : 'Zero calories burned, lots of synapses destroyed'
      });
      await createActivity({ 
        name: 'Honey Do', 
        description : 'Complete an item off of the list'
      });
      await createActivity({ 
        name: 'Mustachio', 
        description : 'Finger twists - led by Rollie Fingers'
      });
      await createActivity({ 
        name: 'The husband', 
        description : 'Low effort, low burn-rate, lots of longevity'
      });
      console.log("Finished creating activities!");
    } catch (error) {
      console.error("Error creating activities!");
      throw error;
    }
}
async function createInitialRoutines() {
  try {
    console.log("Starting to create routines...");

    await createRoutine({ 
      creatorId: 1, 
      public : true,
      name: 'The Sloth',
      goal: 'Continuity'
    });
    await createRoutine({ 
      creatorId: 2, 
      public : false,
      name: 'The Lounger',
      goal: 'Comfort'
    }); 
    await createRoutine({ 
      creatorId: 1, 
      public : false,
      name: 'The Hubby',
      goal: 'Conflict Avoidance'
    }); 
    await createRoutine({ 
      creatorId: 3, 
      public : true,
      name: 'The Herbalist',
      goal: 'Live to two hundred years'
    }); 
    await createRoutine({ 
      creatorId: 4, 
      public : true,
      name: 'The Karen',
      goal: 'Seeing your Manager'
    }); 
    await createRoutine({ 
      creatorId: 5, 
      public : true,
      name: 'The Dripper',
      goal: 'Perspire on all the equipment'
    }); 
    await createRoutine({ 
      creatorId: 5, 
      public : false,
      name: 'The Cross-Trainer',
      goal: `Show everyone how it's really done`
    });
    
    console.log("Finished creating routines!");
  } catch (error) {
    console.error("Error creating routines!");
    throw error;
  }
}
async function createInitialRoutineActivities() {
  try {
    console.log("Starting to create routine activities...");

    await addActivityToRoutine({ 
      routineId: 1, 
      activityId : 1,
      count: 1,
      duration: 1
    });
   
    await addActivityToRoutine({ 
      routineId: 2, 
      activityId : 1,
      count: 1,
      duration: 1
    });
    
    await addActivityToRoutine({ 
      routineId: 1, 
      activityId : 2,
      count: 1,
      duration: 1
    });
    
    await addActivityToRoutine({ 
      routineId: 3, 
      activityId : 1,
      count: 4,
      duration: 2
    });
    
    await addActivityToRoutine({ 
      routineId: 3, 
      activityId : 2,
      count: 3,
      duration: 3
    });
    
    await addActivityToRoutine({ 
      routineId: 3, 
      activityId : 3,
      count: 4,
      duration: 2
    });
    
    await addActivityToRoutine({ 
      routineId: 3, 
      activityId : 4,
      count: 2,
      duration: 5
    });
    
    await addActivityToRoutine({ 
      routineId: 4, 
      activityId : 4,
      count: 1,
      duration: 1
    });
    
    await addActivityToRoutine({ 
      routineId: 4, 
      activityId : 3,
      count: 1,
      duration: 1
    });

    console.log("Finished creating routine activities!");
  } catch (error) {
    console.error("Error creating routine activities!");
    throw error;
  }
}

  async function buildDB() {
    try {
      await dropTables();
      await createTables();
      await createInitialUsers();
      await createInitialActivities();
      await createInitialRoutines();
      await createInitialRoutineActivities();
    } catch (error) {
      console.log("Error during buildDB")
      throw error;
    }
}

  buildDB()
  .catch(console.error)
  .finally(() => client.end());

