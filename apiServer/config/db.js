// db 연결
const mysql = require('mysql2');
const poolOptions = require('./poolOptions');

const pool = mysql.createPool(poolOptions);

module.exports = pool.promise();