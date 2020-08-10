//In this file, I will create users and provide GetUser

const { client } = require('./client');

//Create User - 
// createUser({ username, password })
//  Passsword hashing/salting will be added on later

async function createUser({
    username,
    password
}) {
    try {
        const { rows: [ user ] } = await client.query(`
        INSERT INTO users (username, password)
        VALUES($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, password]);
        return user;
    } catch (error) {
        throw error;
    }
}

//Get User
//getUser({ username, password })
//this function will verify password - these will be kept plain for 
//now - unhashed - this shoudl be a relatively easy transition
//it's sort of like translating, or coding/de-coding - at the 
//end, if the same process is applied to both, it won't matter





module.exports = {
    createUser
}