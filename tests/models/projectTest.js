const Project = require('../../database').models.project;
const test = require('ava').test;
const sinon = require('sinon');

const project = Project.build({ id: 1, title: 'A title' });
const items = [{ value: 1 }, { value: 2 }];

test('#json - when detail, returns data, items and clients', async t => {
  sinon.stub(project, 'getItems').returns(items);
  t.deepEqual({ 
    id: 1, 
    title: 'A title', 
    value: 3, 
    items: items, 
  }, await project.json({ detail: true }));
});

test('#json - when not detail, returns data values', async t => {
  t.deepEqual({ 
    id: 1, 
    title: 'A title', 
  }, await project.json());
});
