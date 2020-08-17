// getAllRoutines
// select and return an array of all routines, include their activities

const { client } = require('./client');


//getPublicRoutines
//select and return an array of public routines, include their activities

async function getPublicRoutines() {
    try {
      const { rows } = await client.query(`
        SELECT id, "creatorId", name, goal
        FROM routines WHERE public = true;
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

//getAllRoutinesByUser
//getAllRoutinesByUser({ username })
// select and return an array of all routines made by user, include their activities


//getPublicRoutinesByUser
//getPublicRoutinesByUser({ username })
//select and return an array of public routines made by user, include their activities


//getPublicRoutinesByActivity
//getPublicRoutinesByActivity({ activityId })
//select and return an array of public routines which have a specific activityId in their routine_activities join, include their activities


//createRoutine({ creatorId, public, name, goal })
//create and return the new routine


async function createRoutine({
    creatorId,
    public,
    name,  //means routine name, not person's name
    goal
}) {
    try {
        const { rows: [ routine ] } = await client.query(`
        INSERT INTO routines ("creatorId", public, name, goal)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `, [creatorId, public, name, goal]);
        return routine;
    } catch (error) {
        throw error;
    }
}



//updateRoutine
//updateRoutine({ id, public, name, goal })
//Find the routine with id equal to the passed in id
//Don't update the routine id, but do update the public status, name, or goal, as necessary
//Return the updated routine



//destroyRoutine
//destroyRoutine(id)
//remove routine from database
// Make sure to delete all the routine_activities whose routine is the one being deleted.


module.exports = {
    createRoutine,
    getPublicRoutines
}