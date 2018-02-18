'use strict';

const Project = require('../../database').models.project;
const test = require('ava').test;
const sinon = require('sinon');

const project = Project.build({ id: 1, title: 'A title' });
const items = [{ value: 1 }, { value: 2 }];

test('#total - adds client values', async t => {
  sinon.stub(project, 'getItems').returns(items);
  t.is(3, await project.getTotal());
});

test('#json - returns data values and total', async t => {
  sinon.stub(project, 'getTotal').returns(5);
  t.deepEqual({ id: 1, title: 'A title', total: 5 }, await project.json());
});
