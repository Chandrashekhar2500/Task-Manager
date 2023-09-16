const express = require('express');
const router = express.Router();
const db = require('./db');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const {putNoise, removeNoise} = require('./utils')

router.post('/register', async(req, res) => {
  const {userName, email, password} = req.body
  const encryptPassword = putNoise(password)

  const body = {
    id : uuidv4(),
    userName : userName,
    email: email,
    password: encryptPassword,
  }

  const sqlQuery = 'INSERT INTO users SET ?';
  db.query(sqlQuery, body, (queryErr, results) => {
    if (queryErr) {
      console.error('Error executing query:', queryErr);
      res.json({ code: 500, message:'Register Failed' });
      return;
    }
    res.json({ code: 200, message:'Register Successfully', data:results });
  });
});

router.post('/login', async(req, res) => {
  const {userName, email, password} = req.body
  var findUser = ''
  if (userName){
    findUser = "SELECT * FROM users WHERE userName ='" + userName + "'";
  } else {
    findUser = "SELECT * FROM users WHERE email ='" + email + "'";
  }

  db.query(findUser, (queryErr, results) => {
    if (queryErr) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if(results){
      const decryptPassword = removeNoise(results[0].password)
      if (password === decryptPassword) {
        const secretKey = 'iosysmarketplace';
        const payload = {
          uuid:results[0].id,
          userName:results[0].userName
        };
        const options = {
          expiresIn: '1h',
        };
        const token = jwt.sign(payload, secretKey, options);
        res.status(200).json({ code: 200, message:'Successfully LoggedIn', data:{token:token} });
      } else {
        res.status(401).json({ code: 401, message:'Password Incorrect' });
      }
    }
  });
});


router.post('/getTasks', (req, res) => {
    const sqlQuery = `SELECT * FROM tasks WHERE uuid ='${req.body.uuid}'`;
    db.query(sqlQuery, (queryErr, results) => {
      if (queryErr) {
        console.error('Error executing query:', queryErr);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ code: 200, message:'Data fetched', data:results });
    });
});

router.post('/addTask', (req, res) => {
  const {uuid, name, description, status} = req.body

  const body = {
    id : uuidv4(),
    name : name,
    description: description,
    status: status,
    uuid: uuid
  }

  const sqlQuery = 'INSERT INTO tasks SET ?';
  db.query(sqlQuery, body, (queryErr, results) => {
    if (queryErr) {
      console.error('Error executing query:', queryErr);
      res.json({ code: 500, message:'Task Inertion Failed' });
      return;
    }
    res.json({ code: 200, message:'Task Inserted' });
  });
});

router.post('/deleteTask', (req, res) => {
  
  const sqlQuery = `DELETE FROM tasks WHERE id='${req.body.id}' AND uuid='${req.body.uuid}'`;
  db.query(sqlQuery, (queryErr, results) => {
    if (queryErr) {
      console.error('Error executing query:', queryErr);
      res.json({ code: 500, message:'Task Deletion Failed' });
      return;
    }
    res.json({ code: 200, message:'Task Deleted' });
  });
});

router.post('/updateTask', (req, res) => {

  const {uuid, id, name, description, status} = req.body
  const sqlQuery = `UPDATE tasks SET name= '${name}', description= '${description}', status= '${status}' WHERE id= '${id}' AND uuid= '${uuid}'`;
  db.query(sqlQuery, (queryErr, results) => {
    if (queryErr) {
      console.error('Error executing query:', queryErr);
      res.json({ code: 500, message:'Task Updation Failed' });
      return;
    }
    res.json({ code: 200, message:'Task Updated' });
  });
});

module.exports = router;
