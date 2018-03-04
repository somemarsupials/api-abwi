'use strict';

let now = new Date();
let projects = [];

for (let i = 0; i < 5; i++) {
  projects.push({
    title: `project ${i}`,
    createdAt: now,
    updatedAt: now
  });
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('projects', projects, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects', projects, {});
  },
};
