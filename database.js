'use strict';

const Sequelize = require('sequelize');

const uri = process.env.DATABASE_URL || 'postgres://localhost:5432/abwi';
const sequelize = new Sequelize(uri);
const db = {}

// Check database connection
// TBD: do we need to throw an actual error?

const models = [
  'project',
  'item',
];

models.forEach(function(model) {
  db[model] = sequelize.import(`./models/${model}`);
});

models.forEach(model => {
  if (db[model].associate) {
    db[model].associate(db);
  };
});

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
module.exports.models = db;

