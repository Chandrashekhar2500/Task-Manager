const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'taskmanager',
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');

    const tableName = ['users', 'tasks'];
    tableName.map(item=>{
      if(item === 'users'){
        connection.query(`
        CREATE TABLE IF NOT EXISTS ${item} (
          id VARCHAR(255),
          userName VARCHAR(255),
          email VARCHAR(255),
          password VARCHAR(255),
          PRIMARY KEY (id))`, (queryErr, results) => {
            if (queryErr) {
              console.error('Error executing query:', queryErr);
              throw queryErr;
            }
          });
      } else {
        connection.query(`
        CREATE TABLE IF NOT EXISTS ${item} (
          id VARCHAR(255),
          name VARCHAR(255),
          description VARCHAR(255),
          status VARCHAR(255),
          PRIMARY KEY (id))`, (queryErr, results) => {
            if (queryErr) {
              console.error('Error executing query:', queryErr);
              throw queryErr;
            }
          });
      } 
    })
  });

  module.exports = connection;
