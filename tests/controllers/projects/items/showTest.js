'use strict';

const action = require('../../../../controllers/projects/items/show');
const test = require('ava').test;
const sinon = require('sinon');

const project = { json: sinon.stub().returns('hello') };
const req = { params: { id: 5, projectId: 7 } };
const res = { sendStatus: sinon.spy(), json: sinon.spy() };

test('GET /projects/:id/items/:id - when database error', async t => {
  let model = { find: sinon.stub().throws(new Error()) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(500)); 
});

test('GET /projects/:id/items/:id - when doesn\'t exist', async t => {
  let model = { find: sinon.stub().returns(null) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(404));
});

test('GET /projects/:id/items/:id - sends correct JSON', async t => {
  let model = { find: sinon.stub().returns(project) };
  await action(req, res, null, model);
  t.true(res.json.calledWith('hello'));
});

test('GET /projects/:id/items/:id - uses correct ID', async t => {
  let model = { find: sinon.stub().returns(project) };
  await action(req, res, null, model);
  t.true(model.find.calledWith({ where: { id: 5, projectId: 7 } }));
});

