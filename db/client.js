//Place to build and export an unconnected client - we will 
//export this client as required to other files - probably 
//could have put this in a utilities file as well

const { Client } = require('pg')  //imports postgresql module

//set connection to default port/path, or specify alternate path/port
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/fitness'

//create the client
const client = new Client(connectionString);















module.exports = {
    client
}