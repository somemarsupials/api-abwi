'use strict';

const Project = require('../../database').models.project;
const test = require('ava').test;
const sinon = require('sinon');

const project = Project.build({ id: 1, title: 'A title' });
const items = [{ value: 1 }, { value: 2 }];

test('#total - adds client values', async t => {
  sinon.stub(project, 'getItems').returns(items);
  await project.getTotal();
  t.is(3, project.total);
});
