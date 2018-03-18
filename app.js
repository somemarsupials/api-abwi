const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

/* middlewares */

// third-party middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// custom middlewares
app.use(require('./middlewares/queryFilter'));

/* routes */

app.use('/projects', require('./controllers/projects/'));
app.use('/clients', require('./controllers/clients/'));

module.exports = app;
