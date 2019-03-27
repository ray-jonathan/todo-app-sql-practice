//First, require 'pg-promise'
//Call it immediately, which gives us a configured database connector
const pgp = require('pg-promise')();
// const pgp = require('pg-promise')({ // this version helps to console.log what's going on on the SQL side
//     query: e => {
//         console.log('QUERY: ', e.query);
//     }  
//     });


// next, define the options for the connection to the database
const options = {
    host: 'localhost',
    database: 'todo-app'
};

//make a connection to the database specified by the options object
const db = pgp(options);
module.exports = db;