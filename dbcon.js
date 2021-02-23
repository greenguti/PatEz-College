var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_danielpa',
    password: '3318',
    database: 'cs340_danielpa'
});
module.exports.pool = pool;