'use strict';

const action = require('../../../controllers/clients/show');
const test = require('ava').test;
const sinon = require('sinon');

const client = { json: sinon.stub().returns('hello') };
const req = { params: { id: 5 } };
const res = { sendStatus: sinon.spy(), json: sinon.spy() };

test('GET /clients/:id - when database error', async t => {
  let model = { find: sinon.stub().throws(new Error()) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(500)); 
});

test('GET /clients/:id - when doesn\'t exist', async t => {
  let model = { find: sinon.stub().returns(null) };
  await action(req, res, null, model);
  t.true(res.sendStatus.calledWith(404));
});

test('GET /clients/:id - sends correct JSON', async t => {
  let model = { find: sinon.stub().returns(client) };
  await action(req, res, null, model);
  t.true(res.json.calledWith('hello'));
});

test('GET /clients/:id - uses correct ID', async t => {
  let model = { find: sinon.stub().returns(client) };
  await action(req, res, null, model);
  t.true(model.find.calledWith({ where: { id: 5 } }));
});

