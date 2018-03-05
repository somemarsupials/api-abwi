const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routes

app.use('/projects', require('./controllers/projects/'));

module.exports = app;
