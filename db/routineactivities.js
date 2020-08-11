const { client } = require('./client');




// addActivityToRoutine
// addActivityToRoutine({ routineId, activityId, count, duration })
//create a new routine_activity, and return it

async function addActivityToRoutine({
    routineId,
    activityId,
    count,
    duration
}) {
    try {
        const { rows: [ routineactivity ] } = await client.query(`
        INSERT INTO routineactivities ("routineId", "activityId", count, duration)
        VALUES($1, $2, $3, $4)
        ON CONFLICT ("routineId","activityId" ) DO NOTHING   
        RETURNING *;
        `, [routineId, activityId, count, duration]);
        return routineactivity;
    } catch (error) {
        throw error;
    }
}

//updateRoutineActivity
//updateRoutineActivity({ id, count, duration })
//Find the routine with id equal to the passed in id
//Update the count or duration as necessary



//destroyRoutineActivity
//destroyRoutineActivity(id)
// remove routine_activity from database

module.exports = {
    addActivityToRoutine
}