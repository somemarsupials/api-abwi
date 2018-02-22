'use strict';

const action = require('../../../controllers/projects/show');
const test = require('ava').test;
const sinon = require('sinon');

const project = { json: sinon.stub().returns('hello') };
const req = { params: { id: 5 } };
const res = { sendStatus: sinon.spy(), json: sinon.spy() };

test('GET /project/:id - when database error', async t => {
  let model = { find: sinon.stub().throws(new Error()) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(500)); 
});

test('GET /project/:id - when doesn\'t exist', async t => {
  let model = { find: sinon.stub().returns(null) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(404));
});

test('GET /project/:id - sends correct JSON', async t => {
  let model = { find: sinon.stub().returns(project) };
  await action(req, res, null, model);
  t.true(res.json.calledWith('hello'));
});

test('GET /project/:id - uses correct ID', async t => {
  let model = { find: sinon.stub().returns(project) };
  await action(req, res, null, model);
  t.true(model.find.calledWith({ where: { id: 5 } }));
});

