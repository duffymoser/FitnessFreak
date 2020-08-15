//db/index.js
//This is a place to create and export the client, as well as to import and re-export the functions from our other files above.
//new  client

const { Client } = require('pg') // imports the pg module

const client = new Client('postgres://localhost:5432/fitness');


//sweetest thing ever!

module.exports = {
    ...require('./client'), // re-export client for use in our server file
    ...require('./users'), // adds key/values from users.js
    ...require('./activities'), // adds key/values from activites.js
    ...require('./routines'), // etc
    ...require('./routineactivities') // etc
  }


//attempted to add bluebird here - I think some of my stack traces 
//in Node aren't very helpful

//const Promise = require('bluebird');
//Promise.config({
//    longStackTraces: true,
//    warnings: true
//})

//that didnt seem to do anything - probably set up wrong

