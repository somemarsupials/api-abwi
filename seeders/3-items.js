'use strict';

let now = new Date();
let items = [], project, relative;

for (let i = 0; i < 25; i++) {
  project = Math.floor(i / 5);
  relative = i % 5;
  items.push({
    id: i,
    description: `item ${relative}`,
    value: i,
    projectId: project,
    createdAt: now,
    updatedAt: now,
  });
};

let descriptions = items.map(function(item) { 
  return item.description;
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('items', items, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('items', { 
      description: descriptions 
    }, {});
  },
};
