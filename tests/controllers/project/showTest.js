'use strict';

const action = require('../../../controllers/projects/show');
const test = require('ava').test;
const sinon = require('sinon');

const project = { json: sinon.stub().returns('hello') };
const req = { params: { id: 5 } };

test('GET /project/:id - when database error', async t => {
  let res = { sendStatus: sinon.spy() };
  let model = { find: sinon.stub().throws(new Error()) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(500)); 
});

test('GET /project/:id - sends correct JSON', async t => {
  let res = { json: sinon.spy() };
  let model = { find: sinon.stub().returns(project) };
  await action(req, res, null, model);
  t.true(res.json.calledWith('hello'));
});

test('GET /project/:id - uses correct ID', async t => {
  let res = { json: sinon.spy() };
  let model = { find: sinon.stub().returns(project) };
  await action(req, res, null, model);
  t.true(model.find.calledWith({ id: 5 }));
});

