const Client = require('../../database').models.client;
const test = require('ava').test;
const sinon = require('sinon');

const client = Client.build({ id: 1, name: 'J' });

test('#json - when no detail', async t => {
  t.deepEqual({ 
    id: 1, 
    name: 'J', 
  }, await client.json());
});

test('#json - when detail', async t => {
  sinon.stub(client, 'getProjects').returns([1, 2]);
  t.deepEqual({ 
    id: 1, 
    name: 'J', 
    projects: [1, 2]
  }, await client.json({ detail: true }));
});

