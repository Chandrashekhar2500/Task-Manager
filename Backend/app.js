const express = require('express');
const app = express();
const cors = require('cors');
const userController = require('./userController')
const db = require('./db')

app.use(cors());
app.use(express.json());
app.use('/api', userController);

app.listen(5000, () => {
    console.log('Server listening on port 5000');
});