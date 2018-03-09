'use strict';

let now = new Date();
let projects = [];

for (let project = 0; project < 5; project++) {
  projects.push({
    id: project,
    title: `Project ${project}`,
    clientId: project % 3,
    createdAt: now,
    updatedAt: now,
  });
};

let titles = projects.map(function(project) { 
  return project.title;
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('projects', projects, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects', { title: titles }, {});
  },
};
