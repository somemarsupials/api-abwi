const Client = require('../../database').models.client;
const test = require('ava').test;
const sinon = require('sinon');

const client = Client.build({ id: 1, name: 'J' });

test('#json', t => {
  t.deepEqual({ 
    id: 1, 
    name: 'J', 
  }, client.json());
});

