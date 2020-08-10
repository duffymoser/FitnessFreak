const { client } = require('./client');
const { builtinModules } = require('module');




//getAllActivities
// returns an array of all activities - no pw required - 
// i.e., presume no GetUser


//createActivity
// as above - no getUser
// createActivity({ name, description })

async function createActivity({
    name,
    description
}) {
    try {
        const { rows: [ activity ] } = await client.query(`
        INSERT INTO activities (name, description)
        VALUES($1, $2)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        `, [name, description]);
        return activity;
    } catch (error) {
        throw error;
    }
}



// updateActivity
// still no getUser - anyone can mod any activity
// updateActivity ({ id, name, description })
// updates name, description, maintains id
// returns updated activity


module.exports = {
    createActivity
}