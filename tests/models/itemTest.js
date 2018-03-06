const Item = require('../../database').models.item;
const test = require('ava').test;
const sinon = require('sinon');

const item = Item.build({ id: 1, description: 'Stuff', projectId: 4 });

test('#json', t => {
  t.deepEqual({ 
    id: 1, 
    description: 'Stuff', 
    projectId: 4
  }, item.json());
});

