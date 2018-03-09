'use strict';

let now = new Date();
let clients = [];

for (let client = 0; client < 3; client++) {
  clients.push({
    id: client,
    name: `James McCannon ${client}`,
    createdAt: now,
    updatedAt: now,
  });
};

let names = clients.map(function(client) {
  return client.name;
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('clients', clients, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('clients', { name: names }, {});
  },
};
